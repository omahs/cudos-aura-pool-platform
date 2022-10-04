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
  token_id: number;

  @AllowNull(false)
  @Column
  denom_id: string;

  @AllowNull(false)
  @Column
  time: number;

  @AllowNull(false)
  @Column
  amount: number;
}
