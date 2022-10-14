import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import NftEntity from '../../entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';

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
}
