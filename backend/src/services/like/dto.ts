import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsOptional } from 'class-validator';

export class CreateLikeDto {
	@ApiProperty({ example: 'uuid-of-post', description: 'Target post id' })
	@IsUUID()
	postId: string;
}
