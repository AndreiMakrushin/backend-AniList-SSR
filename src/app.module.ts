import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AnimeModule } from './anime/anime.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'aniList',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    AnimeModule,
  ],
})
export class AppModule {}
