import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UserEntity } from '@app/user/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoEntity } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllTodo(@User('id') currentUserId: number): Promise<TodoEntity[]> {
    return this.todoService.getAllTodo(currentUserId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @User() currentUser: UserEntity,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.createTodo(createTodoDto, currentUser);

    return this.todoService.buildTodoResponse(todo);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: CreateTodoDto,
    @User('id') currentUserId: number,
  ): Promise<TodoEntity> {
    const todo = await this.todoService.updateTodo(
      id,
      updateTodoDto,
      currentUserId,
    );

    return this.todoService.buildTodoResponse(todo);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTodo(@Param('id') id: string, @User('id') currentUserId: number) {
    return this.todoService.deleteTodo(id, currentUserId);
  }
}
