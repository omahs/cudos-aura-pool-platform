import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsTo,
  ForeignKey,
  HasMany,
  PrimaryKey,
  Unique,
  DataType,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Farm } from '../farm/farm.model';
import { NFT } from '../nft/nft.model';
import { CollectionStatus } from './utils';

@Table({
  freezeTableName: true,
  tableName: 'collections',
})
export class Collection extends Model {
  @Unique
  @PrimaryKey
  @Column
  id: number;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  denom: string;

  @AllowNull(false)
  @Column
  hashing_power: number;

  @AllowNull(false)
  @Column(DataType.ENUM('queued', 'approved', 'rejected', 'issued', 'deleted'))
  status: CollectionStatus;

  @Column
  @ForeignKey(() => Farm)
  farm_id: number;

  @BelongsTo(() => Farm)
  farm: Farm;

  @AllowNull(false)
  @Column
  @ForeignKey(() => User)
  owner_id: number;

  @BelongsTo(() => User)
  owner: User;

  @HasMany(() => NFT)
  nfts: NFT[];

  @Column
  deleted_at: Date;
}
