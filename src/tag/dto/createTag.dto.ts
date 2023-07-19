import { IsHexColor, IsNotEmpty } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  @IsHexColor()
  readonly color: string;
}
