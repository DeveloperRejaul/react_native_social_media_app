import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './schema';
import { User } from '../user/schema';
import { Post } from '../post/schema';
import { CreateCommentDto, UpdateCommentDto, GetCommentsDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly model: typeof Comment,
  ) {}

  async create(dto: CreateCommentDto) {
    const comment = await this.model.create(dto as any);
    if (!comment.id) throw new Error('Failed to create comment');
    return {
      message: 'Comment created successfully',
      comment: await this.findOne(comment.id),
    };
  }

  async findAll(dto: GetCommentsDto = {}) {
    const { postId } = dto;
    const where = postId ? { postId } : {};

    const comments = await this.model.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Post, attributes: ['id', 'content'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return {
      message: 'Comments retrieved successfully',
      comments,
    };
  }

  async findOne(id: string) {
    const comment = await this.model.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Post, attributes: ['id', 'content'] },
      ],
    });

    return comment;
  }

  async update(id: string, dto: UpdateCommentDto) {
    await this.model.update(dto, { where: { id } });
    return {
      message: 'Comment updated successfully',
      comment: await this.findOne(id),
    };
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
    return {
      message: 'Comment deleted successfully',
    };
  }
}