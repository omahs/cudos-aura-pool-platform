import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../../presentation/repos/CollectionRepo';

export default class CollectionApi implements CollectionRepo {

    async fetchCategories(): Promise < string [] > {
        return null;
    }

    async fetchTopCollections(period: number): Promise < CollectionEntity[] > {
        return null;
    }

    async fetchAllCollections(): Promise < CollectionEntity[] > {
        return null;
    }

    async fetchCollectionsByIds(idArray: string[]): Promise < CollectionEntity[] > {
        return null;
    }

    async fetchCollectionEntity(collectionId: string): Promise < CollectionEntity > {
        return null;
    }

    async fetchCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number): Promise < { collectionEntities: CollectionEntity[], total: number } > {
        return null;
    }
}
