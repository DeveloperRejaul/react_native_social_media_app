import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { PostService } from './service';
import { CreatePostDto } from './dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/auth-guard';
import { CreateCommentDto } from '../comment/dto';
import { AuthData, AuthUser } from 'src/decorators/auth';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @UseGuards(AuthGuard)
  create(@Body() dto: CreatePostDto, @AuthData('id') userId:string) {
    return this.service.create({...dto, userId});
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @UseGuards(AuthGuard)
  findAll(@AuthUser() user, @Query() query) {
    return this.service.findAll(user, query);
  }

  @Put(':id/like')
  @ApiOperation({ summary: 'Like a post' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'Post ID to like' })
  createLike(@Param('id') postId: string, @AuthData('id') userId:string) {
    return this.service.createLike(postId, userId);
  }


  @Put(':id/comment')
  @ApiOperation({ summary: 'Comment on a post' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'string', description: 'Post ID to comment on' })
  createComment(@Param('id') postId: string, @Body() dto: CreateCommentDto, @AuthData('id') userId:string) {
    return this.service.createComment(dto, postId, userId);
  }
}