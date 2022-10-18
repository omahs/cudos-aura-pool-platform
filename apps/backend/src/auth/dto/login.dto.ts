import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, example: 'farm_admin@mail.com' })
      email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: '12345' })
      password: string;
}
