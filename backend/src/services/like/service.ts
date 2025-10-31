import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './schema';
import { User } from '../user/schema';
import { Post } from '../post/schema';
import { CreateLikeDto, GetLikesDto } from './dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like) private readonly model: typeof Like,
  ) {}

  async create(dto: CreateLikeDto) {
    const existing = await this.model.findOne({
      where: { userId: dto.userId, postId: dto.postId },
    });

    if (existing) {
      throw new BadRequestException('User has already liked this post');
    }

    const like = await this.model.create(dto as any);
    if (!like.id) throw new Error('Failed to create like');
    return {
      message: 'Like created successfully',
      like: await this.findOne(like.id),
    };
  }

  async findAll(dto: GetLikesDto = {}) {
    const { postId } = dto;
    const where = postId ? { postId } : {};

    const likes = await this.model.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Post, attributes: ['id', 'content'] },
      ],
    });

    return {
      message: 'Likes retrieved successfully',
      likes,
    };
  }

  async findOne(id: string) {
    const like = await this.model.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Post, attributes: ['id', 'content'] },
      ],
    });

    return like;
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
    return {
      message: 'Like removed successfully',
    };
  }
}