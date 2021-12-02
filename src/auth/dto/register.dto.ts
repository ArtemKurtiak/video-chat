import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}
