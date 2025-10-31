import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentDto {
	@ApiProperty({ example: 'Nice post!', description: 'Comment content' })
	@IsString()
	@IsNotEmpty()
	content: string;
}