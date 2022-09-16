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
} from 'sequelize-typescript';
import { Farm } from '../farm/farm.model';
import { NFT } from '../nft/nft.model';

@Table
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

  @Column
  @ForeignKey(() => Farm)
  farm_id: number;

  @BelongsTo(() => Farm)
  farm: Farm;

  @HasMany(() => NFT)
  nfts: NFT[];
}
