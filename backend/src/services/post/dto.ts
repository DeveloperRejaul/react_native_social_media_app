import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreatePostDto {
	@ApiProperty({ example: 'Hello world', description: 'Post content' })
	@IsString()
	@IsNotEmpty()
	content: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}