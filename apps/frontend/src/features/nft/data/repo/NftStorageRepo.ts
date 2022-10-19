import StorageHelper from '../../../../core/helpers/StorageHelper';
import NftEntity from '../../entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';
import NftFilterModel from '../../utilities/NftFilterModel';

export default class NftStorageRepo implements NftRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchNftById(nftId: string): Promise < NftEntity > {
        const nftJson = this.storageHelper.nftsJson.find((json) => json.id === nftId);
        return NftEntity.fromJson(nftJson)
    }

    async fetchNewNftDrops(): Promise < NftEntity[] > {
        // TODO: sort them by listing date or something?
        const nftEntities = this.storageHelper.nftsJson.slice(0, 10).map((json) => NftEntity.fromJson(json));

        return nftEntities;
    }

    async fetchTrendingNfts(): Promise < NftEntity[] > {
        // TODO: sort them by something?
        const nftEntities = this.storageHelper.nftsJson.slice(0, 10).map((json) => NftEntity.fromJson(json));

        return nftEntities;
    }

    async fetchNftsByFilter(nftFilterModel: NftFilterModel): Promise < { nftEntities: NftEntity[], total: number } > {
        let nftsSlice = this.storageHelper.nftsJson.map((json) => NftEntity.fromJson(json));

        if (nftFilterModel.searchString !== '') {
            nftsSlice = nftsSlice.filter((json) => {
                return json.name.toLowerCase().indexOf(nftFilterModel.searchString) !== -1;
            });
        }

        nftsSlice.sort((a: NftEntity, b: NftEntity) => {
            switch (nftFilterModel.sortKey) {
                case NftFilterModel.SORT_KEY_PRICE:
                    return a.price.comparedTo(b.price)
                case NftFilterModel.SORT_KEY_NAME:
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        return {
            nftEntities: nftsSlice.slice(nftFilterModel.from, nftFilterModel.from + nftFilterModel.count),
            total: nftsSlice.length,
        };
    }
}
