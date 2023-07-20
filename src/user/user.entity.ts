import { TagEntity } from '@app/tag/tag.entity';
import { TodoEntity } from '@app/todo/todo.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => TagEntity, (tag) => tag.creator)
  tags: TagEntity[];

  @OneToMany(() => TodoEntity, (todo) => todo.tag)
  todo: TodoEntity[];
}
