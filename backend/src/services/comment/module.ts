import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './schema';
import { CommentService } from './service';
import { CommentController } from './controller';

@Module({
  imports: [SequelizeModule.forFeature([Comment])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}