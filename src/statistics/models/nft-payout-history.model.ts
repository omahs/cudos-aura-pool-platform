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
import { NftOwnersPayoutHistory } from './nft-owners-payout-history.model';

@Table({
  freezeTableName: true,
  tableName: 'statistics_nft_payout_history',
})
export class NftPayoutHistory extends Model {
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

  @Column
  payout_period_start: number;

  @Column
  payout_period_end: number;

  @Column
  reward: number;

  @AllowNull(false)
  @Column
  tx_hash: string;

  @BelongsTo(() => NftOwnersPayoutHistory)
  nft_owners_payout_history: NftOwnersPayoutHistory;
}
