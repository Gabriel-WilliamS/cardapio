import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
