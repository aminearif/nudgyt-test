import { Document } from 'mongoose';

export interface UserType extends Document {
  userName: string;
  email: string;
  password: string;
}
