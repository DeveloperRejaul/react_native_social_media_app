import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';

export class CreateShareDto {
  @ApiProperty({ example: 'uuid-of-post', description: 'Target post id' })
  @IsUUID()
  postId: string;

  @ApiProperty({ example: 'uuid-of-user', description: 'User who shares' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'Check this out', description: 'Optional share message' })
  @IsOptional()
  @IsString()
  message?: string;
}

export class UpdateShareDto extends PartialType(CreateShareDto) {}

export class GetSharesDto {
  @IsOptional()
  @IsUUID()
  postId?: string;
}