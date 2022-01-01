export interface IUserRedis {
  socketId: string;
  userId: number;
}

export interface IMessageRedis {
  from: number;
  to: number;
  chat: number;
}
