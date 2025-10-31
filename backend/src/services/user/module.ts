import { Module } from '@nestjs/common';
import { User } from './schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './controller';
import { UserService } from './service';


@Module({
  imports: [
    SequelizeModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }