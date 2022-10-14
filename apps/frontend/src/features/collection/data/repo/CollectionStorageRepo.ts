import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../../presentation/repos/CollectionRepo';

export default class CollectionStorageRepo implements CollectionRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchCategories(): Promise < string [] > {
        // TODO: get categories from
        return this.storageHelper.categoriesJson;
    }

    async fetchTopCollections(period: number): Promise < CollectionEntity[] > {
        // TODO: get collectionEntities
        const collectionEntities = this.storageHelper.collectionsJson.slice(0, 18).map((json) => CollectionEntity.fromJson(json));

        return collectionEntities;
    }

    async fetchAllCollections(): Promise < CollectionEntity[] > {
        // TODO: get collectionEntitiess
        return this.storageHelper.collectionsJson.map((json) => CollectionEntity.fromJson(json));
    }

    async fetchCollectionsByIds(idArray: string[]): Promise < CollectionEntity[] > {
        const collectionEntitiess = this.storageHelper.collectionsJson
            .filter((json) => idArray.includes(json.id))
            .map((json) => CollectionEntity.fromJson(json));

        return collectionEntitiess;
    }

    async fetchCollectionEntity(collectionId: string): Promise < CollectionEntity > {
        const collectionJson = this.storageHelper.collectionsJson.find((json) => json.id === collectionId);
        return CollectionEntity.fromJson(collectionJson);
    }

    async fetchCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number): Promise < { collectionEntities: CollectionEntity[], total: number } > {
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

        return {
            collectionEntities: sortedCollectionsEntities.slice(from, from + count),
            total: sortedCollectionsEntities.length,
        }
    }

}
