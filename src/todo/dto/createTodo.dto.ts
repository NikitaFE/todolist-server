import { IsEnum, IsNotEmpty } from 'class-validator';
import { PriorityEnum } from '../types/priority.enum';

export class CreateTodoDto {
  @IsNotEmpty()
  readonly text: string;

  readonly done: boolean;

  @IsEnum(PriorityEnum)
  readonly priority: PriorityEnum;

  readonly tag: number;
}
