import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './schema';
import { User } from '../user/schema';
import { Like } from '../like/schema';
import { Comment } from '../comment/schema';
import { Share } from '../share/schema';
import { CreatePostDto, UpdatePostDto, GetPostsDto } from './dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly model: typeof Post,
  ) {}

  async create(dto: CreatePostDto) {
    const post = await this.model.create(dto as any);
    if (!post.id) throw new Error('Failed to create post');
    return {
      message: 'Post created successfully',
      post: await this.findOne(post.id),
    };
  }

  async findAll(dto: GetPostsDto = {}) {
    const { userId, limit = 10, offset = 0 } = dto;
    const where = userId ? { userId } : {};

    const posts = await this.model.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Like, attributes: ['id', 'userId'] },
        { model: Comment, attributes: ['id', 'content', 'userId'] },
        { model: Share, attributes: ['id', 'message', 'userId'] },
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      message: 'Posts retrieved successfully',
      posts,
    };
  }

  async findOne(id: string) {
    const post = await this.model.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Like, attributes: ['id', 'userId'] },
        { model: Comment, attributes: ['id', 'content', 'userId'] },
        { model: Share, attributes: ['id', 'message', 'userId'] },
      ],
    });

    return post;
  }

  async update(id: string, dto: UpdatePostDto) {
    await this.model.update(dto, { where: { id } });
    return {
      message: 'Post updated successfully',
      post: await this.findOne(id),
    };
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
    return {
      message: 'Post deleted successfully',
    };
  }
}