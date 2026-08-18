import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserQueryDto {
  @ApiPropertyOptional({
    description: 'Email пользователя',
    example: 'user@example.com',
  })
  email?: string;

  @ApiPropertyOptional({ description: 'ID пользователя', example: 1 })
  id?: number;
}

export class UserDto {
  @ApiPropertyOptional({ example: 1 })
  id!: number;

  @ApiPropertyOptional({ example: 'Иван Иванов' })
  name!: string;

  @ApiPropertyOptional({ example: 'user@example.com' })
  email!: string;

  @ApiPropertyOptional({ example: false })
  isBanned!: boolean;

  @ApiPropertyOptional({ example: 'https://i.pravatar.cc/300' })
  avatar?: string;
}
