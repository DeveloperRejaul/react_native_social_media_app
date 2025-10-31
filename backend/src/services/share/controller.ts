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
import { ShareService } from './service';
import { CreateShareDto, UpdateShareDto, GetSharesDto } from './dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/auth-guard';

@ApiTags('shares')
@Controller('shares')
@UseGuards(AuthGuard)
export class ShareController {
  constructor(private readonly service: ShareService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new share' })
  create(@Body() dto: CreateShareDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shares' })
  findAll(@Query() dto: GetSharesDto) {
    return this.service.findAll(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a share by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a share' })
  update(@Param('id') id: string, @Body() dto: UpdateShareDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a share' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}