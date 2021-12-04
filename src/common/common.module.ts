import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtService, PasswordService } from './services';
import { Auth } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Auth])],
  providers: [JwtService, PasswordService],
  exports: [JwtService, PasswordService],
})
export class CommonModule {}
