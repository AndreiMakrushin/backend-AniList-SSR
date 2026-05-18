import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'email', description: 'Email пользователя' })
  email!: string;
  @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
  password!: string;
}
