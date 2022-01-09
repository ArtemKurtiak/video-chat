import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'age',
  })
  age?: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'Phone number',
  })
  telephone: string;
}
