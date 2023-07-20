import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { TagEntity } from '@app/tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity, TagEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
