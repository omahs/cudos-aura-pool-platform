import { NftStatus } from '../utils';

export class UpdateNFTStatusDto {
    status: NftStatus.APPROVED | NftStatus.REJECTED;
}
