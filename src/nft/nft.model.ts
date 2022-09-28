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
  DataType,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Collection } from '../collection/collection.model';
import { NftStatus } from './utils';

@Table({
  freezeTableName: true,
  tableName: 'nfts',
})
export class NFT extends Model {
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Unique
  @Column
  uuid: string;

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
  @Column
  price: number;

  @AllowNull(false)
  @IsDate
  @Column
  expiration_date: Date;

  @AllowNull(false)
  @Column(DataType.ENUM('queued', 'approved', 'rejected', 'expired', 'deleted'))
  status: NftStatus;

  @Column
  @ForeignKey(() => Collection)
  collection_id: number;

  @BelongsTo(() => Collection)
  collection: Collection;

  @AllowNull(false)
  @Column
  @ForeignKey(() => User)
  owner_id: number;

  @BelongsTo(() => User)
  owner: User;

  @Column
  deleted_at: Date;
}
