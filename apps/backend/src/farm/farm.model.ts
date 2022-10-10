import {
    Column,
    Model,
    Table,
    AllowNull,
    BelongsTo,
    HasMany,
    ForeignKey,
    PrimaryKey,
    Unique,
    AutoIncrement,
} from 'sequelize-typescript';
import { Collection } from '../collection/collection.model';
import { User } from '../user/user.model';

@Table({
    freezeTableName: true,
    tableName: 'farms',
})
export class Farm extends Model {
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
      sub_account_name: string;

  @AllowNull(false)
  @Column
      location: string;

  @AllowNull(false)
  @Column
      btc_wallet: string;

  @AllowNull(false)
  @Column
      default_btc_payout_address: string;

  @AllowNull(false)
  @Column
      maintenance_fee: number;

  @AllowNull(false)
  @Column
  @ForeignKey(() => User)
      creator_id: number;

  @BelongsTo(() => User)
      creator: User;

  @HasMany(() => Collection)
      collections: Collection[];

  @Column
      deleted_at: Date;
}
