import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionPreviewEntity from '../../entities/CollectionPreviewEntity';
import CollectionProfileEntity from '../../entities/CollectionProfileEntity';
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

    getTopCollections(period: number, callback: (collections: CollectionPreviewEntity[]) => void) {
        // TODO: get collections
        const collections = this.storageHelper.collectionsJson.slice(0, 18).map((json) => CollectionPreviewEntity.fromJson(json));
        callback(collections);
    }

    getAllCollections(callback: (collections: CollectionPreviewEntity[]) => void) {
        // TODO: get collections
        const collections = this.storageHelper.collectionsJson.map((json) => CollectionPreviewEntity.fromJson(json));
        callback(collections);
    }

    async getCollectionsByIds(idArray: string[]): Promise<CollectionProfileEntity[]> {
        const collections = this.storageHelper.collectionsJson
            .filter((json) => idArray.includes(json.id))
            .map((json) => CollectionProfileEntity.fromJson(json));

        return collections;
    }

    getCollectionProfile(collectionId: string, callback: (collection: CollectionProfileEntity) => void) {
        const farms = this.storageHelper.miningFarmsJson;
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === collectionId);

        collectionJson.farmName = farms.find((farmJson) => {
            return farmJson.id === collectionJson.farmId
        }).name;
        const collection = CollectionProfileEntity.fromJson(collectionJson);

        callback(collection);
    }

    getCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number, callback: (collectionPreviews: CollectionPreviewEntity[], total: number) => void) {
        const collectionJsons = this.storageHelper.collectionsJson.filter((json) => json.farmId === farmId);
        const collections = collectionJsons.map((json) => CollectionPreviewEntity.fromJson(json));

        const sortedcollections = collections.sort((a: CollectionPreviewEntity, b: CollectionPreviewEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        callback(sortedcollections.slice(from, from + count), sortedcollections.length);
    }
}
