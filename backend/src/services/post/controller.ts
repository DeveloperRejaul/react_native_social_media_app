import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './service';
import { CreatePostDto, UpdatePostDto, GetPostsDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/auth-guard';

@ApiTags('posts')
@Controller('posts')
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly service: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  create(@Body() dto: CreatePostDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  findAll(@Query() dto: GetPostsDto) {
    return this.service.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}