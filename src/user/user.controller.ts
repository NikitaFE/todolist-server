import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { UserType } from './types/user.type';
import { LoginUserDto } from './dto/loginUserDto';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from './user.entity';
import { User } from './decorators/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserType> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<UserType> {
    const user = await this.userService.loginUser(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('current')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserType> {
    return this.userService.buildUserResponse(user);
  }
}
