import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

export class CreateLikeDto {
	@ApiProperty({ example: 'uuid-of-post', description: 'Target post id' })
	@IsUUID()
	postId: string;

	@ApiProperty({ example: 'uuid-of-user', description: 'User who liked' })
	@IsUUID()
	userId: string;
}

export class UpdateLikeDto extends PartialType(CreateLikeDto) {}

export class GetLikesDto {
	@IsOptional()
	@IsUUID()
	postId?: string;
}
