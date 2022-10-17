import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import NftEntity from '../../entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';
import NftFilterModel from '../../utilities/NftFilterModel';
import NftApi from '../data-sources/NftApi';

export default class NftApiRepo implements NftRepo {

    nftApi: NftApi;

    constructor() {
        this.nftApi = new NftApi();
    }

    async fetchNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
    ): Promise < { nftEntities: NftEntity[], total: number } > {
        return this.nftApi.fetchNftsByOwnerAddressSortedPaginated(ownerAddress, sortKey, start, size);
    }

    async fetchNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
    ) {
        return this.nftApi.fetchNftsByCollectionIdCategoryAndSearchSortedPaginated(collectionId, search, category, sortKey, start, size);
    }

    async fetchNftEntity(
        nftId: string,
    ): Promise < { nftEntity: NftEntity, collectionEntity: CollectionEntity, miningFarmEntity: MiningFarmEntity } > {
        return this.nftApi.fetchNftEntity(nftId);
    }

    async fetchNftsByFilter(nftFilterModel: NftFilterModel): Promise < { nftEntities: NftEntity[], total: number } > {
        return this.nftApi.fetchNftsByFilter(nftFilterModel);
    }
}
