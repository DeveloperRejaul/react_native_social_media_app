import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePostDto {
	@ApiProperty({ example: 'Hello world', description: 'Post content' })
	@IsString()
	@IsNotEmpty()
	content: string;

	@ApiProperty({ example: 'uuid-of-user', description: 'Author user id' })
	@IsUUID()
	userId: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class GetPostsDto {
	@IsOptional()
	@IsUUID()
	userId?: string;

	@IsOptional()
	limit?: number;

	@IsOptional()
	offset?: number;
}
