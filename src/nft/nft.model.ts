import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  Unique,
  IsDate,
  IsUrl,
  AllowNull,
} from 'sequelize-typescript';
import { Collection } from '../collection/collection.model';

@Table
export class NFT extends Model {
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @IsUrl
  @Column
  uri: string;

  @Column
  data: string;

  @AllowNull(false)
  @Column
  hashing_power: number;

  @AllowNull(false)
  @IsDate
  @Column
  expiration_date: Date;

  @Column
  @ForeignKey(() => Collection)
  collection_id: number;

  @BelongsTo(() => Collection)
  collection: Collection;
}
