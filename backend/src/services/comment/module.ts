import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from '../comment/schema';
import { Like } from '../like/schema';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
})
export class CommentModule {}