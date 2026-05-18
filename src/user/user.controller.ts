import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { FindUserQueryDto } from './dto/user-find.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find')
  async findUser(
    @Query() query: FindUserQueryDto,
  ): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>[] | null> {
    const { email, id } = query;
    const where: Partial<User> = {};

    if (email) where.email = email;
    if (id) where.id = id;

    if (Object.keys(where).length === 0) return this.userService.findAll();
    return this.userService.findByFields(where);
  }
}
