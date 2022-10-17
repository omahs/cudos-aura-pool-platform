import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import NftEntity from '../../entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';
import NftFilterModel from '../../utilities/NftFilterModel';

export default class NftStorageRepo implements NftRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
    ): Promise < { nftEntities: NftEntity[], total: number } > {
        const nftJsons = this.storageHelper.nftsJson
            .filter(
                (json) => {
                    return json.currentOwnerAddress === ownerAddress
                },
            )

        const nftEntitiesJson = nftJsons.map((json) => NftEntity.fromJson(json));

        const sortedNftEntities = nftEntitiesJson.sort((a: NftEntity, b: NftEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        return {
            nftEntities: sortedNftEntities.slice(start, start + size),
            total: sortedNftEntities.length,
        };
    }

    async fetchNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
    ) {
        const filteredNftEntities = this.storageHelper.nftsJson
            .filter(
                (json) => (json.name.toLowerCase().includes(search.toLowerCase()))
                        && (category === 'All' || json.category === category)
                        && (collectionId === S.Strings.EMPTY || json.collectionId === collectionId),
            ).map((json) => NftEntity.fromJson(json));

        const sortedNftEntities = filteredNftEntities.sort((a: NftEntity, b: NftEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        return {
            nftEntities: sortedNftEntities.slice(start, start + size),
            total: sortedNftEntities.length,
        };
    }

    async fetchNftEntity(
        nftId: string,
    ): Promise < { nftEntity: NftEntity, collectionEntity: CollectionEntity, miningFarmEntity: MiningFarmEntity } > {
        const nftJson = this.storageHelper.nftsJson.find((json) => json.id === nftId);
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === nftJson.collectionId);
        const farmJson = this.storageHelper.miningFarmsJson.find((json) => json.id === collectionJson.farmId);

        return {
            nftEntity: NftEntity.fromJson(nftJson),
            collectionEntity: CollectionEntity.fromJson(collectionJson),
            miningFarmEntity: MiningFarmEntity.fromJson(farmJson),
        };
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
