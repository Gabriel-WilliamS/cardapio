import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class FindByEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
