import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../../presentation/repos/CollectionRepo';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';

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

    async fetchCollectionsByFilter(collectionFilterModel: CollectionFilterModel): Promise < { collectionEntities: CollectionEntity[], total: number } > {
        const collectionSlice = this.storageHelper.collectionsJson.map((json) => json);

        if (collectionFilterModel.sessionAccount === S.INT_TRUE) {
            collectionSlice.filter((json) => {
                return json.ownerAddress === 'cudos1';
            });
        }

        if (collectionFilterModel.farmId !== '') {
            collectionSlice.filter((json) => {
                return json.farmId === collectionFilterModel.farmId;
            });
        }

        if (collectionFilterModel.searchString !== '') {
            collectionSlice.filter((json) => {
                return json.name.toLowerCase().indexOf(collectionFilterModel.searchString) !== -1;
            });
        }

        collectionSlice.sort((a: CollectionEntity, b: CollectionEntity) => {
            switch (collectionFilterModel.sortKey) {
                case CollectionFilterModel.SORT_KEY_PRICE:
                    return a.price.comparedTo(b.price)
                case CollectionFilterModel.SORT_KEY_NAME:
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        return {
            collectionEntities: collectionSlice.slice(collectionFilterModel.from, collectionFilterModel.from + collectionFilterModel.count),
            total: collectionSlice.length,
        }
    }

}
