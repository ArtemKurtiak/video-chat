export interface ICallUser {
  userId: string;
  name: string;
  signal: any;
  phone: string;
}

export interface IAnswerUser {
  signal: any;
  userId: string;
}

export interface IMessageUser {
  message: string;
  to: number;
  from: number;
}
