import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  }

  async comparePasswords(password: string, hash: string) {
    const matched = await bcrypt.compare(password, hash);

    if (!matched) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
