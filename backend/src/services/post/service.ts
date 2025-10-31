import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './schema';
import { User } from '../user/schema';
import { Like } from '../like/schema';
import { Comment } from '../comment/schema';
import { CreateCommentDto } from '../comment/dto';
import { Query } from '../auth/query';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly model: typeof Post,
    @InjectModel(Like) private readonly like: typeof Like,
    @InjectModel(Comment) private readonly comment: typeof Comment,
  ) {}

  async create(dto) {
    const post = await this.model.create(dto);
    if (!post.id) throw new Error('Failed to create post');
    return {
      message: 'Post created successfully',
      post: await this.findOne(post.id),
    };
  }

  @Query()
  async findAll(user, query, options?) {
    const posts = await this.model.findAll({
      ...options,
      where :{
        userId: user.id
      },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Like, attributes: ['id', 'userId'] },
        { model: Comment, attributes: ['id', 'content', 'userId'] },
      ]
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
      ],
    });

    return post;
  }

  async createComment (dto: CreateCommentDto, postId:string, userId:string) {
    const comment = await this.comment.create({...dto, userId, postId} as any);
    if (!comment.id) throw new Error('Failed to create comment');
    return {
        message: 'Comment created successfully',
    };
  }

  async createLike (postId:string, userId:string) {
    const existing = await this.like.findOne({
        where: { userId: userId, postId: postId },
    });
    
    if (existing) {
        throw new BadRequestException('User has already liked this post');
    }
    
    const like = await this.like.create({userId, postId} as any);
    if (!like.id) throw new Error('Failed to create like');
    return {
        message: 'Like created successfully',
    };
  }
}