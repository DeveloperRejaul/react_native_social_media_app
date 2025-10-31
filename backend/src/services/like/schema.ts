import {
	Table,
	Column,
	Model,
	PrimaryKey,
	IsUUID,
	DataType,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';
import { User } from '../user/schema';
import { Post } from '../post/schema';

@Table({ tableName: 'Likes' })
export class Like extends Model<Like> {
	@IsUUID(4)
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: UUIDV4 })
	declare id?: string;

	@ForeignKey(() => User)
	@Column({ type: DataType.UUID, allowNull: false })
	userId: string;

	@ForeignKey(() => Post)
	@Column({ type: DataType.UUID, allowNull: false })
	postId: string;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Post)
	post: Post;
}
