import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionPreviewEntity from '../../../collections-marketplace/entities/CollectionPreviewEntity';
import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import NftPreviewEntity from '../../entities/NftPreviewEntity';
import NftProfileEntity from '../../../nft-details/entities/NftProfileEntity';
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
        callback: (nftPreviews: NftPreviewEntity[], total: number) => void,
    ) {
        const nftPreviewJsons = this.storageHelper.nftsJson
            .filter(
                (json) => {
                    return json.currentOwnerAddress === ownerAddress
                },
            )

        const nftPreviewModels = nftPreviewJsons.map((json) => NftPreviewEntity.fromJson(json));

        const sortedNftPreviewModels = nftPreviewModels.sort((a: NftPreviewEntity, b: NftPreviewEntity) => {
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

    getNftsByCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftPreviewEntity[], total: number) => void,
    ) {

        this.collectionRepo.getAllCollections((collections: CollectionPreviewEntity[]) => {
            // TODO: get NFTs
            const filteredNftPreviewModels = this.storageHelper.nftsJson
                .filter(
                    (json) => (json.name.toLowerCase().includes(search.toLowerCase()))
                                && (category === 'All' || json.category === category)
                                && (collectionId === S.Strings.EMPTY || json.collectionId === collectionId),
                )
                .map((json) => {
                    json.collectionName = collections.find((collection: CollectionPreviewEntity) => collection.id === json.collectionId).name;
                    return NftPreviewEntity.fromJson(json);
                });

            const sortedNftPreviewModels = filteredNftPreviewModels.sort((a: NftPreviewEntity, b: NftPreviewEntity) => {
                switch (sortKey.toLowerCase()) {
                    case 'price':
                        return a.price.comparedTo(b.price)
                    case 'name':
                    default:
                        return a.name.localeCompare(b.name)
                }
            });

            callback(sortedNftPreviewModels.slice(start, start + size), sortedNftPreviewModels.length);
        });
    }

    getNftProfile(nftId: string, callback: (nftProfile: NftProfileEntity, collectionProfile: CollectionProfileEntity, farmView: MiningFarmEntity) => void) {
        const nftProfileJson = this.storageHelper.nftsJson.find((json) => json.id === nftId);
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === nftProfileJson.collectionId);
        const farmJson = this.storageHelper.miningFarmsJson.find((json) => json.id === collectionJson.farmId);

        callback(NftProfileEntity.fromJson(nftProfileJson), CollectionProfileEntity.fromJson(collectionJson), MiningFarmEntity.fromJson(farmJson));
    }
}
