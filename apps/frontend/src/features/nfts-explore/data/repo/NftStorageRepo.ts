import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import NftEntity from '../../../nft-details/entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';

export default class NftStorageRepo implements NftRepo {
    storageHelper: StorageHelper;
    collectionRepo: CollectionRepo;

    constructor(collectionRepo: CollectionRepo) {
        this.storageHelper = new StorageHelper();
        this.collectionRepo = collectionRepo;
    }

    getNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftEntities: NftEntity[], total: number) => void,
    ) {
        const nftJsons = this.storageHelper.nftsJson
            .filter(
                (json) => {
                    return json.currentOwnerAddress === ownerAddress
                },
            )

        const nftEntities = nftJsons.map((json) => NftEntity.fromJson(json));

        const sortedNftEntities = nftEntities.sort((a: NftEntity, b: NftEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        callback(sortedNftEntities.slice(start, start + size), sortedNftEntities.length);
    }

    getNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftEntities: NftEntity[], total: number) => void,
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

        callback(sortedNftEntities.slice(start, start + size), sortedNftEntities.length);
    }

    getNftProfile(nftId: string, callback: (nftEntity: NftEntity, collectionEntity: CollectionProfileEntity, farmView: MiningFarmEntity) => void) {
        const nftJson = this.storageHelper.nftsJson.find((json) => json.id === nftId);
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === nftJson.collectionId);
        const farmJson = this.storageHelper.miningFarmsJson.find((json) => json.id === collectionJson.farmId);

        callback(NftEntity.fromJson(nftJson), CollectionProfileEntity.fromJson(collectionJson), MiningFarmEntity.fromJson(farmJson));
    }
}
