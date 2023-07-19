import { IsNotEmpty } from 'class-validator';
import { LoginUserDto } from './loginUserDto';

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  username: string;
}
