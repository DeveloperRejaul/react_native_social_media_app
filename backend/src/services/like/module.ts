import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './schema';
import { LikeService } from './service';
import { LikeController } from './controller';

@Module({
  imports: [SequelizeModule.forFeature([Like])],
  providers: [LikeService],
  controllers: [LikeController],
  exports: [LikeService],
})
export class LikeModule {}