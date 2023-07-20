import { TagEntity } from '@app/tag/tag.entity';
import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PriorityEnum } from './types/priority.enum';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn()
  index: number;

  @Column()
  text: string;

  @Column({ default: false })
  done: boolean;

  @Column({ default: PriorityEnum.medium })
  priority: PriorityEnum;

  @ManyToOne(() => UserEntity, (user) => user.todo, { eager: true })
  creator: UserEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.todo, { eager: true })
  tag: TagEntity;
}
