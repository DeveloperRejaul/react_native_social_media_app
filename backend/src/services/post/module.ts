import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './schema';
import { PostService } from './service';
import { PostController } from './controller';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}