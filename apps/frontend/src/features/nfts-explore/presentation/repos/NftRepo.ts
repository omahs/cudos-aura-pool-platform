import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import NftEntity from '../../../nft-details/entities/NftEntity';

export default interface NftRepo {

    getNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftEntities: NftEntity[], total: number) => void,
    );

    getNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftEntities: NftEntity[], total: number) => void,
    );

    getNftProfile(
        nftId: string,
        callback: (nftEntity: NftEntity, collectionProfile: CollectionProfileEntity, farmView: MiningFarmEntity) => void);
}
