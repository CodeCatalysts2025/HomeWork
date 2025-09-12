import { Types } from 'mongoose';
import { ERRORS } from '../types/get-messages.types';

export const validateObjectId = (id: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(ERRORS.INVALID_OBJECT_ID);
  }
};

const validateSingleUserId = (userId: string, _fieldName: string): void => {
  if (!Types.ObjectId.isValid(userId)) {
    throw new Error(ERRORS.INVALID_USER_IDS);
  }
};

export const validateUserIds = (senderId?: string, receiverId?: string): void => {
  if (senderId) {
    validateSingleUserId(senderId, 'senderId');
  }
  if (receiverId) {
    validateSingleUserId(receiverId, 'receiverId');
  }
}; 