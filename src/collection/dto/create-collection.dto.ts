export class CreateCollectionDto {
  name: string;
  description: string;
  denom: string;
  hashing_power: number;
  royalties: number;
  payout_address: string;
  farm_id: number;
}
