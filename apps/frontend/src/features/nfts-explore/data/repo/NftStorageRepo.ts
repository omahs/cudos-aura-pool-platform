import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionPreviewEntity from '../../../collections-marketplace/entities/CollectionPreviewEntity';
import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import NftProfileEntity from '../../../nft-details/entities/NftEntity';
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
        callback: (nftPreviews: NftProfileEntity[], total: number) => void,
    ) {
        const nftPreviewJsons = this.storageHelper.nftsJson
            .filter(
                (json) => {
                    return json.currentOwnerAddress === ownerAddress
                },
            )

        const nftPreviewModels = nftPreviewJsons.map((json) => NftProfileEntity.fromJson(json));

        const sortedNftPreviewModels = nftPreviewModels.sort((a: NftProfileEntity, b: NftProfileEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        callback(sortedNftPreviewModels.slice(start, start + size), sortedNftPreviewModels.length);
    }

    getNftsByCollectionIdCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftProfileEntity[], total: number) => void,
    ) {
        const filteredNftProfileModels = this.storageHelper.nftsJson
            .filter(
                (json) => (json.name.toLowerCase().includes(search.toLowerCase()))
                        && (category === 'All' || json.category === category)
                        && (collectionId === S.Strings.EMPTY || json.collectionId === collectionId),
            ).map((json) => NftProfileEntity.fromJson(json));

        const sortedNftPreviewModels = filteredNftProfileModels.sort((a: NftProfileEntity, b: NftProfileEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        callback(sortedNftPreviewModels.slice(start, start + size), sortedNftPreviewModels.length);
    }

    getNftProfile(nftId: string, callback: (nftProfile: NftProfileEntity, collectionProfile: CollectionProfileEntity, farmView: MiningFarmEntity) => void) {
        const nftProfileJson = this.storageHelper.nftsJson.find((json) => json.id === nftId);
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === nftProfileJson.collectionId);
        const farmJson = this.storageHelper.miningFarmsJson.find((json) => json.id === collectionJson.farmId);

        callback(NftProfileEntity.fromJson(nftProfileJson), CollectionProfileEntity.fromJson(collectionJson), MiningFarmEntity.fromJson(farmJson));
    }
}
