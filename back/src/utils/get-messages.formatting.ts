import { Types, Document } from 'mongoose';

interface PopulatedUser {
  _id: Types.ObjectId;
  email?: string | null;
  password?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface PopulatedMessage {
  _id: Types.ObjectId;
  sender: PopulatedUser | null;
  receiver: PopulatedUser | null;
  content?: string | null;
  createdAt: Date;
}

// Type for the actual Mongoose document after population
type MongoosePopulatedMessage = Document & {
  _id: Types.ObjectId;
  sender: PopulatedUser | Types.ObjectId;
  receiver?: PopulatedUser | Types.ObjectId;
  content: string;
  createdAt?: Date;
  toObject?: () => any;
}

const formatField = (value: string | null | undefined, defaultValue = '') => {
  return value || defaultValue;
};

const formatDate = (date: Date | null | undefined) => {
  return date?.toISOString() || new Date().toISOString();
};

const formatUser = (
  user: PopulatedMessage['sender'] | PopulatedMessage['receiver'] | null
) => {
  const safeUser = user || {
    _id: new Types.ObjectId(),
    email: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return {
    id: safeUser._id.toString(),
    email: formatField(safeUser.email),
    password: formatField(safeUser.password),
    createdAt: formatDate(safeUser.createdAt),
    updatedAt: formatDate(safeUser.updatedAt),
  };
};

const isPopulatedUser = (user: any): user is PopulatedUser => {
  return user && typeof user === 'object' && user._id && user.email !== undefined;
};

const getPopulatedMessage = (message: MongoosePopulatedMessage): PopulatedMessage => {
  const messageObj = message.toObject ? message.toObject() : message;
  
  return {
    _id: messageObj._id,
    sender: isPopulatedUser(messageObj.sender) ? messageObj.sender : null,
    receiver: messageObj.receiver && isPopulatedUser(messageObj.receiver) ? messageObj.receiver : null,
    content: messageObj.content,
    createdAt: messageObj.createdAt || new Date(),
  };
};

export const formatMessage = (message: MongoosePopulatedMessage) => {
  const populatedMessage = getPopulatedMessage(message);

  return {
    id: populatedMessage._id.toString(),
    sender: formatUser(populatedMessage.sender),
    receiver: formatUser(populatedMessage.receiver),
    content: populatedMessage.content || '',
    createdAt: populatedMessage.createdAt.toISOString(),
  };
};
