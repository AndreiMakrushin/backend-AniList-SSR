import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userCreateDto: UserCreateDto) {
    const emailExists = await this.usersRepository.existsBy({
      email: userCreateDto.email,
    });

    if (emailExists) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(userCreateDto.password, 10);

    const user = this.usersRepository.create({
      ...userCreateDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
  }

  async findAll(
    where: Partial<User> = {},
  ): Promise<Omit<User, 'password' | 'createdAt' | 'updatedAt'>[]> {
    const users = await this.usersRepository.find({ where });

    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        isBanned: user.isBanned,
      };
    });
  }
  async findByFields(
    where: Partial<User>,
  ): Promise<Pick<User, 'id' | 'name' | 'email' | 'isBanned'>[]> {
    const users = await this.usersRepository.find({ where });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isBanned: user.isBanned,
    }));
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }
}
