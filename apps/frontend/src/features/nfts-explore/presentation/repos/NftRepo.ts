import CollectionEntity from '../../../collection/entities/CollectionEntity';
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

    getNftEntity(
        nftId: string,
        callback: (nftEntity: NftEntity, collectionEntity: CollectionEntity, farmView: MiningFarmEntity) => void);
}
