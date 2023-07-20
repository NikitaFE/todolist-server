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
import { CreateTagDto } from './dto/createTag.dto';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllTags(@User('id') currentUserId: number): Promise<TagEntity[]> {
    return this.tagService.getAllTags(currentUserId);
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTag(
    @User() currentUser: UserEntity,
    @Body() createTagDto: CreateTagDto,
  ): Promise<TagEntity> {
    const tag = await this.tagService.createTag(createTagDto, currentUser);

    return this.tagService.buildTagResponse(tag);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async editTag(
    @Param('id') id: string,
    @User('id') currentUserId: number,
    @Body() createTagDto: CreateTagDto,
  ): Promise<TagEntity> {
    const tag = await this.tagService.editTag(id, createTagDto, currentUserId);

    return this.tagService.buildTagResponse(tag);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTag(@Param('id') id: string, @User('id') currentUserId: number) {
    return this.tagService.deleteTag(id, currentUserId);
  }
}
