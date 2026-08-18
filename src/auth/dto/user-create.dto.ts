import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @ApiProperty({ example: 'name', description: 'Имя пользователя' })
  name!: string;
  @ApiProperty({ example: 'email', description: 'Email пользователя' })
  email!: string;
  @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
  password!: string;
}
