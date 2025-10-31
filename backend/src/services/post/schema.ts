import {
	Table,
	Column,
	Model,
	PrimaryKey,
	IsUUID,
	DataType,
	ForeignKey,
	BelongsTo,
	HasMany,
} from 'sequelize-typescript';
import { User } from '../user/schema';
import { Like } from '../like/schema';
import { Comment } from '../comment/schema';
import { Share } from '../share/schema';
import { UUIDV4 } from 'sequelize';

@Table({ tableName: 'Posts' })
export class Post extends Model<Post> {
	@IsUUID(4)
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: UUIDV4 })
	declare id?: string;

	@Column({ allowNull: false, type: DataType.TEXT })
	content: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID, allowNull: false })
	userId: string;

	@BelongsTo(() => User)
	user: User;

	@HasMany(() => Like)
	likes: Like[];

	@HasMany(() => Comment)
	comments: Comment[];

	@HasMany(() => Share)
	shares: Share[];
}
