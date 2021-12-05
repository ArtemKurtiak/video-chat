import { Request } from '@nestjs/common';

import { IUser } from './user.interface';

export interface IRequest extends Request {
  user: IUser;
  body: any;
  headers: any;
}
