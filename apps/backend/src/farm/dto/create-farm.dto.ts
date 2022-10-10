export class CreateFarmDto {
    name: string;
    description: string;
    sub_account_name: string;
    location: string;
    btc_wallet: string;
    default_btc_payout_address: string;
    maintanance_fee: number;
}
