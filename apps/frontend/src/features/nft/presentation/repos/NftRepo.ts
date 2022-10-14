import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import NftEntity from '../../entities/NftEntity';

export default interface NftRepo {

    getNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
    ): Promise < { nftEntities: NftEntity[], total: number } >;

    getNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
    ): Promise < { nftEntities: NftEntity[], total: number } >;

    getNftEntity(
        nftId: string,
    ): Promise < { nftEntity: NftEntity, collectionEntity: CollectionEntity, miningFarmEntity: MiningFarmEntity } >;
}
