import {
  Column,
  Model,
  Table,
  PrimaryKey,
  Unique,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { NftPayoutHistory } from './nft-payout-history.model';

@Table({
  freezeTableName: true,
  tableName: 'statistics_nft_owners_payout_history',
})
export class NftOwnersPayoutHistory extends Model {
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @AllowNull(false)
  @Column
  time_owned_from: number;

  @Column
  time_owned_to: number;

  @Column
  total_time_owned: number;

  @AllowNull(false)
  @Column
  owner: string;

  @AllowNull(false)
  @Column
  payout_address: string;

  @Column
  reward: number;

  @AllowNull(false)
  @Column
  nft_payout_history_id: number;

  @HasMany(() => NftPayoutHistory)
  nft_payout_history: NftPayoutHistory[];
}
