import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../../presentation/repos/CollectionRepo';
import CollectionApi from '../data-sources/CollectionApi';

export default class CollectionStorageRepo implements CollectionRepo {

    collectionApi: CollectionApi;

    constructor() {
        this.collectionApi = new CollectionApi();
    }

    async fetchCategories(): Promise < string [] > {
        return this.collectionApi.fetchCategories();
    }

    async fetchTopCollections(period: number): Promise < CollectionEntity[] > {
        return this.collectionApi.fetchTopCollections(period);
    }

    async fetchAllCollections(): Promise < CollectionEntity[] > {
        return this.collectionApi.fetchAllCollections();
    }

    async fetchCollectionsByIds(idArray: string[]): Promise < CollectionEntity[] > {
        return this.collectionApi.fetchCollectionsByIds(idArray);
    }

    async fetchCollectionEntity(collectionId: string): Promise < CollectionEntity > {
        return this.collectionApi.fetchCollectionEntity(collectionId);
    }

    async fetchCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number): Promise < { collectionEntities: CollectionEntity[], total: number } > {
        return this.collectionApi.fetchCollectionsByFarmIdSortedPaginated(farmId, sortKey, from, count);
    }
}
