import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tags' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  color: string;

  @ManyToOne(() => UserEntity, (user) => user.tags, { eager: true })
  creator: UserEntity;
}
