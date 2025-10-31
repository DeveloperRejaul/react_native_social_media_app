import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from '../like/schema';

@Module({
  imports: [SequelizeModule.forFeature([ Like])],
})
export class LikeModule {}