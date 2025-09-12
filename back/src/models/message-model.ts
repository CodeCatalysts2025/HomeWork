import { Schema, model, models, Model, Types } from "mongoose";

export type MessageType = {
  sender: Types.ObjectId;
  receiver?: Types.ObjectId; // Optional for general chat
  content: string;
  isGeneralChat?: boolean; // Flag to identify general chat messages
  createdAt?: Date;
};

const messageSchema = new Schema<MessageType>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: false },
    content: { type: String, required: true, trim: true },
    isGeneralChat: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message: Model<MessageType> =
  models.Message || model<MessageType>("Message", messageSchema);