import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Share } from './schema';
import { User } from '../user/schema';
import { Post } from '../post/schema';
import { CreateShareDto, UpdateShareDto, GetSharesDto } from './dto';

@Injectable()
export class ShareService {
  constructor(
    @InjectModel(Share) private readonly model: typeof Share,
  ) {}

  async create(dto: CreateShareDto) {
    const share = await this.model.create(dto as any);
    if (!share.id) throw new Error('Failed to create share');
    return {
      message: 'Share created successfully',
      share: await this.findOne(share.id),
    };
  }

  async findAll(dto: GetSharesDto = {}) {
    const { postId } = dto;
    const where = postId ? { postId } : {};

    const shares = await this.model.findAll({
      where,
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Post, attributes: ['id', 'content'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    return {
      message: 'Shares retrieved successfully',
      shares,
    };
  }

  async findOne(id: string) {
    const share = await this.model.findOne({
      where: { id },
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: Post, attributes: ['id', 'content'] },
      ],
    });

    return share;
  }

  async update(id: string, dto: UpdateShareDto) {
    await this.model.update(dto, { where: { id } });
    return {
      message: 'Share updated successfully',
      share: await this.findOne(id),
    };
  }

  async remove(id: string) {
    await this.model.destroy({ where: { id } });
    return {
      message: 'Share deleted successfully',
    };
  }
}