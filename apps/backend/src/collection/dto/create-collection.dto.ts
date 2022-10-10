export class CreateCollectionDto {
    name: string;
    description: string;
    denom_id: string;
    hashing_power: number;
    royalties: number;
    maintenance_fee: number;
    payout_address: string;
    farm_id: number;
}
