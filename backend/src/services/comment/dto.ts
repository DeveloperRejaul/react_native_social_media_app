import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
	@ApiProperty({ example: 'uuid-of-post', description: 'Target post id' })
	@IsUUID()
	postId: string;

	@ApiProperty({ example: 'uuid-of-user', description: 'User who comments' })
	@IsUUID()
	userId: string;

	@ApiProperty({ example: 'Nice post!', description: 'Comment content' })
	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class GetCommentsDto {
	@IsOptional()
	@IsUUID()
	postId?: string;
}
