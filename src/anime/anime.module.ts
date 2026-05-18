import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnimeController } from './anime.controller';
import { AnimeService } from './anime.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.ANILIBRIA_API || 'https://anilibria.top/api/v1',
      timeout: 10000,
    }),
  ],
  controllers: [AnimeController],
  providers: [AnimeService],
})
export class AnimeModule {}
