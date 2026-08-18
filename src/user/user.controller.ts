import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './entity/user.entity';
import { FindUserQueryDto, UserDto } from './dto/user-find.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  @ApiResponse({ status: 200, type: UserDto })
  async findUser(@Query() query: FindUserQueryDto): Promise<UserDto | null> {
    const { email, id } = query;
    const where: Partial<User> = {};

    if (email) where.email = email;
    if (id) where.id = id;

    return this.userService.findByFields(where);
  }
}
