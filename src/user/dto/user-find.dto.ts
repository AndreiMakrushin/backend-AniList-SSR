import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindUserQueryDto {
  @ApiPropertyOptional({ description: 'Email', example: '' })
  email?: string;

  @ApiPropertyOptional({ description: 'ID пользователя', example: null })
  id?: number;
}
