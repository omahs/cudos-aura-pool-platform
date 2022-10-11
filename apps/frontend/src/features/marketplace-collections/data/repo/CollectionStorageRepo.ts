import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionPreview from '../../entities/CollectionPreview';
import CollectionProfile from '../../entities/CollectionProfile';
import CollectionRepo from '../../presentation/repos/CollectionRepo';

export default class CollectionStorageRepo implements CollectionRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }

    getCategories(callback: (categories: string[]) => void) {
        // TODO: get categories from
        const categories = this.storageHelper.categoriesJson;
        callback(categories);
    }

    getTopCollections(period: number, callback: (collections: CollectionPreview[]) => void) {
        // TODO: get collections
        const collections = this.storageHelper.collectionsJson.slice(0, 18).map((json) => CollectionPreview.fromJson(json));
        callback(collections);
    }

    getAllCollections(callback: (collections: CollectionPreview[]) => void) {
        // TODO: get collections
        const collections = this.storageHelper.collectionsJson.map((json) => CollectionPreview.fromJson(json));
        callback(collections);
    }

    getCollectionProfile(collectionId: string, callback: (collection: CollectionProfile) => void) {
        const farms = this.storageHelper.miningFarmsJson;
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === collectionId);

        collectionJson.farmName = farms.find((farmJson) => {
            return farmJson.id === collectionJson.farmId
        }).name;
        const collection = CollectionProfile.fromJson(collectionJson);

        callback(collection);
    }

}
