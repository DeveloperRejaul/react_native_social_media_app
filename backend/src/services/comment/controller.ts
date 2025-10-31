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
import { CommentService } from './service';
import { CreateCommentDto, UpdateCommentDto, GetCommentsDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/auth-guard';

@ApiTags('comments')
@Controller('comments')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly service: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  create(@Body() dto: CreateCommentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  findAll(@Query() dto: GetCommentsDto) {
    return this.service.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}