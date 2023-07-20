import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/createTodo.dto';
import { UserEntity } from '@app/user/user.entity';
import { TagEntity } from '@app/tag/tag.entity';

@Injectable()
export class TodoService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async getAllTodo(currentUserId: number): Promise<TodoEntity[]> {
    const queryBuilder = this.dataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.tag', 'tag');

    queryBuilder.where('todo.creatorId = :id', {
      id: currentUserId,
    });

    queryBuilder.orderBy('todo.id');

    const todo = await queryBuilder.getMany();

    return todo;
  }

  async createTodo(
    createTodoDto: CreateTodoDto,
    currentUser: UserEntity,
  ): Promise<TodoEntity> {
    const { tag: tagId, ...todoFields } = createTodoDto;
    const todo = new TodoEntity();
    Object.assign(todo, todoFields);

    todo.creator = currentUser;
    todo.index = todo.id;

    if (tagId) {
      const tag = await this.tagRepository.findOne({
        where: { id: tagId },
      });

      if (!tag) {
        throw new HttpException('Tag does not exist', HttpStatus.NOT_FOUND);
      }

      todo.tag = tag;
    } else {
      todo.tag = null;
    }

    return this.todoRepository.save(todo);
  }

  async updateTodo(
    id: string,
    updateUserDto: CreateTodoDto,
    currentUserId: number,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({
      where: { id: Number(id) },
    });

    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }

    if (todo.creator.id !== currentUserId) {
      throw new HttpException('You are not a creator', HttpStatus.FORBIDDEN);
    }

    const { tag: tagId, ...todoFields } = updateUserDto;

    Object.assign(todo, todoFields);

    if (tagId && tagId !== todo.tag.id) {
      const tag = await this.tagRepository.findOne({
        where: { id: tagId },
      });

      if (!tag) {
        throw new HttpException('Tag does not exist', HttpStatus.NOT_FOUND);
      }

      todo.tag = tag;
    } else if (!tagId) {
      todo.tag = null;
    }

    return this.todoRepository.save(todo);
  }

  async deleteTodo(id: string, currentUserId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id: Number(id) },
    });

    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }

    if (todo.creator.id !== currentUserId) {
      throw new HttpException('You are not a creator', HttpStatus.FORBIDDEN);
    }

    return this.todoRepository.delete({ id: Number(id) });
  }

  buildTodoResponse(todo: TodoEntity): TodoEntity {
    if (todo.tag) {
      delete todo.tag.id;
      delete todo.tag.creator;
    }
    delete todo.creator;
    return todo;
  }
}
