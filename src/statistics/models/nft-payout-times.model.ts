import {
  Column,
  Model,
  Table,
  BelongsTo,
  PrimaryKey,
  Unique,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { NFT } from '../../nft/nft.model';

@Table({
  freezeTableName: true,
  tableName: 'nft_payout_times',
})
export class NftPayoutTimes extends Model {
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  @ForeignKey(() => NFT)
  token_id: number;

  @BelongsTo(() => NFT)
  nft: NFT;

  @Column
  time: number;

  @Column
  amount: number;
}
