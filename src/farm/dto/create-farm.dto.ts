export class CreateFarmDto {
  name: string;
  description: string;
  sub_account_name: string;
  location: string;
  initial_hash_rate: number;
  btc_wallet: string;
  default_btc_payout_address: string;
  maintanance_fee: number;
}
