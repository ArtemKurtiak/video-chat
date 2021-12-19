import { Request } from '@nestjs/common';

import { IUser } from './user.interface';

export interface IRequest extends Request {
  user: IUser;
  userId: number;
  body: any;
  headers: any;
}
