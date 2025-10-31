import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { AppService } from './service';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './services/user/schema';
import { UserModule } from './services/user/module';
import { PostModule } from './services/post/module';
import { Post } from './services/post/schema';
import { Like } from './services/like/schema';
import { Comment } from './services/comment/schema';
import { LikeModule } from './services/like/module';
import { CommentModule } from './services/comment/module';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port:Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database:  process.env.PG_NAME,
      synchronize: true,
      autoLoadModels: true,
      models: [
        User,
        Post,
        Like,
        Comment,
      ],
    }),
    UserModule,
    PostModule,
    LikeModule,
    CommentModule,
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '7d' } }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
