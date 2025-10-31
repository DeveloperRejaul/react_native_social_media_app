import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Share } from './schema';
import { ShareService } from './service';
import { ShareController } from './controller';

@Module({
  imports: [SequelizeModule.forFeature([Share])],
  providers: [ShareService],
  controllers: [ShareController],
  exports: [ShareService],
})
export class ShareModule {}