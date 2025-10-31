import {Table, Column, Model, PrimaryKey, IsUUID, Unique,DataType,ForeignKey, BelongsTo} from 'sequelize-typescript';
import {UUIDV4} from 'sequelize';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: UUIDV4 })
   declare id?: string;

  @Column({ allowNull: false })
    name: string;

  @Unique 
  @Column({ allowNull: false })
    email: string;

  @Column({ allowNull: false })
    password: string;
}