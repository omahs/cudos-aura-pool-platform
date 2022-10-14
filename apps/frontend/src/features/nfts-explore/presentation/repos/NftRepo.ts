import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import NftPreviewEntity from '../../entities/NftPreviewEntity';
import NftProfileEntity from '../../../nft-details/entities/NftProfileEntity';

export default interface NftRepo {

    getNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftPreviewEntity[], total: number) => void,
    );

    getNftsByCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftPreviewEntity[], total: number) => void,
    );

    getNftProfile(
        nftId: string,
        callback: (nftProfile: NftProfileEntity, collectionProfile: CollectionProfileEntity, farmView: MiningFarmEntity) => void);
}
