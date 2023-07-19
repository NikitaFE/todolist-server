import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/createTag.dto';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async createTag(
    createTagDto: CreateTagDto,
    currentUser: UserEntity,
  ): Promise<TagEntity> {
    const tagByText = await this.tagRepository.findOne({
      where: { text: createTagDto.text },
    });
    const tagByColor = await this.tagRepository.findOne({
      where: { color: createTagDto.color },
    });

    if (tagByText) {
      throw new HttpException(
        'Tag with this name already exits',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (tagByColor) {
      throw new HttpException(
        'Tag with this color already exits',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const tag = new TagEntity();
    Object.assign(tag, createTagDto);

    tag.creator = currentUser;
    return this.tagRepository.save(tag);
  }

  async editTag(
    tagId: string,
    createTagDto: CreateTagDto,
    currentUserId: number,
  ): Promise<TagEntity> {
    const id = Number(tagId);
    const tag = await this.tagRepository.findOne({
      where: { id },
    });

    const tagByText = await this.tagRepository.findOne({
      where: { text: createTagDto.text },
    });
    const tagByColor = await this.tagRepository.findOne({
      where: { color: createTagDto.color },
    });

    if (tagByText && tagByText.id !== id) {
      throw new HttpException(
        'Tag with this name already exits',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (tagByColor && tagByColor.id !== id) {
      throw new HttpException(
        'Tag with this color already exits',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (tag.creator.id !== currentUserId) {
      throw new HttpException('You are not a creator', HttpStatus.FORBIDDEN);
    }
    Object.assign(tag, createTagDto);

    return this.tagRepository.save(tag);
  }

  async deleteTag(tagId: string, currentUserId: number) {
    const id = Number(tagId);
    const tag = await this.tagRepository.findOne({
      where: { id },
    });

    if (!tag) {
      throw new HttpException('Tag does not exist', HttpStatus.NOT_FOUND);
    }

    if (tag.creator.id !== currentUserId) {
      throw new HttpException('You are not a creator', HttpStatus.FORBIDDEN);
    }

    return this.tagRepository.delete({ id });
  }

  buildTagResponse(tag: TagEntity): TagEntity {
    delete tag.creator;
    return tag;
  }
}
