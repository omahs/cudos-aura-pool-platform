import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionPreview from '../../../collections-marketplace/entities/CollectionPreview';
import CollectionProfile from '../../../collections-marketplace/entities/CollectionProfile';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import MiningFarmModel from '../../../mining-farm/entities/MiningFarmModel';
import NftPreviewModel from '../../entities/NftPreviewModel';
import NftProfile from '../../../nft-details/entities/NftProfile';
import NftRepo from '../../presentation/repos/NftRepo';

export default class NftStorageRepo implements NftRepo {
    storageHelper: StorageHelper;
    collectionRepo: CollectionRepo;

    constructor(collectionRepo: CollectionRepo) {
        this.storageHelper = new StorageHelper();
        this.collectionRepo = collectionRepo;
    }

    getNftsByCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftPreviewModel[], total: number) => void,
    ) {

        this.collectionRepo.getAllCollections((collections: CollectionPreview[]) => {
            // TODO: get NFTs
            const filteredNftPreviewModels = this.storageHelper.nftsJson
                .filter(
                    (json) => (json.name.toLowerCase().includes(search.toLowerCase()))
                                && (category === 'All' || json.category === category)
                                && (collectionId === S.Strings.EMPTY || json.collectionId === collectionId),
                )
                .map((json) => {
                    json.collectionName = collections.find((collection: CollectionPreview) => collection.id === json.collectionId).name;
                    return NftPreviewModel.fromJson(json);
                });

            const sortedNftPreviewModels = filteredNftPreviewModels.sort((a: NftPreviewModel, b: NftPreviewModel) => {
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

    getNftProfile(nftId: string, callback: (nftProfile: NftProfile, collectionProfile: CollectionProfile, farmView: MiningFarmModel) => void) {
        const nftProfileJson = this.storageHelper.nftsJson.find((json) => json.id === nftId);
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === nftProfileJson.collectionId);
        const farmJson = this.storageHelper.miningFarmsJson.find((json) => json.id === collectionJson.farmId);

        callback(NftProfile.fromJson(nftProfileJson), CollectionProfile.fromJson(collectionJson), MiningFarmModel.fromJson(farmJson));
    }
}
