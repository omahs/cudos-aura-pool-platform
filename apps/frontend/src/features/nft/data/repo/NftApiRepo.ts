import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import NftEntity from '../../entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';
import NftApi from '../data-sources/NftApi';

export default class NftApiRepo implements NftRepo {

    nftApi: NftApi;

    constructor() {
        this.nftApi = new NftApi();
    }

    async getNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
    ): Promise < { nftEntities: NftEntity[], total: number } > {
        return this.nftApi.getNftsByOwnerAddressSortedPaginated(ownerAddress, sortKey, start, size);
    }

    async getNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
    ) {
        return this.nftApi.getNftsByCollectionIdCategoryAndSearchSortedPaginated(collectionId, search, category, sortKey, start, size);
    }

    async getNftEntity(
        nftId: string,
    ): Promise < { nftEntity: NftEntity, collectionEntity: CollectionEntity, miningFarmEntity: MiningFarmEntity } > {
        return this.nftApi.getNftEntity(nftId);
    }
}
