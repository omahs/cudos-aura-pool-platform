import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Unique,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
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

  @AllowNull(false)
  @Column
  maintenance_fee: number;

  @AllowNull(false)
  @Column
  cudo_part_of_maintenance_fee: number;

  @HasMany(() => NftOwnersPayoutHistory)
  nft_owners_payout_history: NftOwnersPayoutHistory;
}
