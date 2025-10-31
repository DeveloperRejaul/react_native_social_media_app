import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './schema';
import { PostService } from './service';
import { PostController } from './controller';
import { Comment } from '../comment/schema';
import { Like } from '../like/schema';

@Module({
  imports: [SequelizeModule.forFeature([Post, Comment, Like])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostModule {}