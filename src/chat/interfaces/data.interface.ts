import { CallStatusesEnum } from '../enums';

export interface ICallUser {
  userId: number;
  me: number;
  name: string;
  signal: any;
  phone: string;
  status: CallStatusesEnum;
  start: string;
  end: string;
}

export interface IAnswerUser {
  signal: any;
  userId: string;
}

export interface IMessageUser {
  message: string;
  to: number;
  from: number;
  chat: string;
}
