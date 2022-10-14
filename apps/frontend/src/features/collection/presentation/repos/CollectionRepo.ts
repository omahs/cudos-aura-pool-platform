import CollectionEntity from '../../entities/CollectionEntity';

export default interface CollectionRepo {

    getCategories(callback: (categories: string[]) => void);

    fetchTopCollections(period: number): Promise < CollectionEntity[] >;

    getAllCollections(callback: (collectionEntities: CollectionEntity[]) => void);

    getCollectionsByIds(idArray: string[]): Promise<CollectionEntity[]>;

    getCollectionEntity(collectionId: string, callback: (collectionEntity: CollectionEntity) => void);

    getCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number, callBack: (collectionEntities: CollectionEntity[], total: number) => void);
}
