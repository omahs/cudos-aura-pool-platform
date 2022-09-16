import {
  Column,
  Model,
  Table,
  AllowNull,
  HasMany,
  Unique,
  PrimaryKey,
  IsEmail,
  AutoIncrement,
} from 'sequelize-typescript';
import { Farm } from '../farm/farm.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Unique
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @Unique
  @AllowNull(false)
  @Column
  salt: string;

  @AllowNull(false)
  @Unique
  @Column
  hashedPass: string;

  @AllowNull(false)
  @Column
  role: string;

  @Column
  cudos_address: string;

  @Column
  payout_address: string;

  @Column
  is_active: boolean;

  @HasMany(() => Farm)
  farms: Farm[];
}
