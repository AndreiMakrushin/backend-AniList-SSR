import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'email', description: 'Email пользователя' })
  email!: string;
  @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
  password!: string;
}

export class UserRegisterDto {
  @ApiProperty({ example: 'name', description: 'Имя пользователя' })
  name!: string;
  @ApiProperty({ example: 'email', description: 'Email пользователя' })
  email!: string;
  @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
  password!: string;
}

export class UserLoginResponseDto {
  @ApiProperty({ example: 'access_token' })
  access_token!: string;
}
