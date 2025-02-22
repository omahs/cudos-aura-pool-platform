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
    AutoIncrement,
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
  @AutoIncrement
  @Column
      id: number;

  @AllowNull(false)
  @Column
      name: string;

  @Column
      description: string;

  @AllowNull(false)
  @Column
      denom_id: string;

  @AllowNull(false)
  @Column
      hashing_power: number;

  @AllowNull(false)
  @Column
      royalties: number;

  @AllowNull(false)
  @Column
      maintenance_fee: number;

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
      creator_id: number;

  @BelongsTo(() => User)
      creator: User;

  @HasMany(() => NFT)
      nfts: NFT[];

  @Column
      deleted_at: Date;
}
