import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionEntity from '../../entities/CollectionEntity';
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

    getTopCollections(period: number, callback: (collectionEntities: CollectionEntity[]) => void) {
        // TODO: get collectionEntities
        const collectionEntities = this.storageHelper.collectionsJson.slice(0, 18).map((json) => CollectionEntity.fromJson(json));
        callback(collectionEntities);
    }

    getAllCollections(callback: (collectionEntitiess: CollectionEntity[]) => void) {
        // TODO: get collectionEntitiess
        const collectionEntitiess = this.storageHelper.collectionsJson.map((json) => CollectionEntity.fromJson(json));
        callback(collectionEntitiess);
    }

    async getCollectionsByIds(idArray: string[]): Promise<CollectionEntity[]> {
        const collectionEntitiess = this.storageHelper.collectionsJson
            .filter((json) => idArray.includes(json.id))
            .map((json) => CollectionEntity.fromJson(json));

        return collectionEntitiess;
    }

    getCollectionEntity(collectionId: string, callback: (collectionEntity: CollectionEntity) => void) {
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === collectionId);

        const collectionEntity = CollectionEntity.fromJson(collectionJson);

        callback(collectionEntity);
    }

    getCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number, callback: (collectionEntities: CollectionEntity[], total: number) => void) {
        const collectionJsons = this.storageHelper.collectionsJson.filter((json) => json.farmId === farmId);
        const collectionEntities = collectionJsons.map((json) => CollectionEntity.fromJson(json));

        const sortedCollectionsEntities = collectionEntities.sort((a: CollectionEntity, b: CollectionEntity) => {
            switch (sortKey.toLowerCase()) {
                case 'price':
                    return a.price.comparedTo(b.price)
                case 'name':
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        callback(sortedCollectionsEntities.slice(from, from + count), sortedCollectionsEntities.length);
    }
}
