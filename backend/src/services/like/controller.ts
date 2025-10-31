import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './service';
import { CreateLikeDto, GetLikesDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/auth-guard';

@ApiTags('likes')
@Controller('likes')
@UseGuards(AuthGuard)
export class LikeController {
  constructor(private readonly service: LikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new like' })
  create(@Body() dto: CreateLikeDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all likes' })
  findAll(@Query() dto: GetLikesDto) {
    return this.service.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a like by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a like' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}