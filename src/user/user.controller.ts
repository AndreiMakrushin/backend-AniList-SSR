import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { FindUserQueryDto } from './dto/user-find.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return this.userService.create(userCreateDto);
  }

  @Get('find')
  async findUser(@Query() query: FindUserQueryDto): Promise<User[]> {
    const { email, id } = query;
    const where: Partial<User> = {};

    if (email) where.email = email;
    if (id) where.id = id;

    if (Object.keys(where).length === 0) return this.userService.findAll();
    return this.userService.findAll();
  }
}
