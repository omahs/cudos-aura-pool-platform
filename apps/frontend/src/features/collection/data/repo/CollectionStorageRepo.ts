import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import CollectionEntity, { CollectionStatus } from '../../entities/CollectionEntity';
import CollectionRepo from '../../presentation/repos/CollectionRepo';
import CollectionFilterModel, { CollectionHashPowerFilter } from '../../utilities/CollectionFilterModel';
import CategoryEntity from '../../entities/CategoryEntity';

export default class CollectionStorageRepo implements CollectionRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchCategories(): Promise < CategoryEntity[] > {
        // TODO: get categories from
        return this.storageHelper.categoriesJson.map((json) => CategoryEntity.fromJson(json));
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

    async fetchCollectionById(collectionId: string): Promise < CollectionEntity > {
        const collectionEntities = await this.fetchCollectionsByIds([collectionId]);
        return collectionEntities.length === 1 ? collectionEntities[0] : null;
    }

    async fetchCollectionsByFilter(collectionFilterModel: CollectionFilterModel): Promise < { collectionEntities: CollectionEntity[], total: number } > {
        let collectionSlice = this.storageHelper.collectionsJson.map((json) => CollectionEntity.fromJson(json));

        if (collectionFilterModel.sessionAccount === S.INT_TRUE) {
            collectionSlice = collectionSlice.filter((json) => {
                return json.ownerAddress === 'cudos1';
            });
        }

        if (collectionFilterModel.farmId !== '') {
            collectionSlice = collectionSlice.filter((json) => {
                return json.farmId === collectionFilterModel.farmId;
            });
        }

        if (collectionFilterModel.searchString !== '') {
            collectionSlice = collectionSlice.filter((json) => {
                return json.name.toLowerCase().indexOf(collectionFilterModel.searchString) !== -1;
            });
        }

        collectionSlice = collectionSlice.filter((json) => {
            return json.status === collectionFilterModel.status;
        });

        if (collectionFilterModel.hashPowerFilter !== CollectionHashPowerFilter.NONE) {
            let hashPowerLimit = S.NOT_EXISTS;
            switch (collectionFilterModel.hashPowerFilter) {
                case CollectionHashPowerFilter.BELOW_1000_EH:
                    hashPowerLimit = 1000;
                    break;
                case CollectionHashPowerFilter.BELOW_2000_EH:
                    hashPowerLimit = 2000;
                    break;
                case CollectionHashPowerFilter.ABOVE_2000_EH:
                default:
                    hashPowerLimit = Number.MAX_SAFE_INTEGER;
                    break;

            }

            collectionSlice = collectionSlice.filter((json) => {
                return json.hashPower <= hashPowerLimit;
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

    async approveCollections(collectionIds: string[]): Promise < void > {
        const colelctionJsons = this.storageHelper.collectionsJson;

        collectionIds.forEach((id) => {
            colelctionJsons.find((json) => json.id === id).status = CollectionStatus.APPROVED;
        })

        this.storageHelper.collectionsJson = colelctionJsons;
        this.storageHelper.save();
    }

}
