import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
