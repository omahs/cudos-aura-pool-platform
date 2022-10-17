import CategoryEntity from '../../entities/CategoryEntity';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';

export default interface CollectionRepo {

    fetchCategories(): Promise < CategoryEntity[] >;

    fetchTopCollections(period: number): Promise < CollectionEntity[] >;

    fetchCollectionsByIds(idArray: string[]): Promise < CollectionEntity[] >;

    fetchCollectionEntity(collectionId: string): Promise < CollectionEntity >;

    fetchCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number): Promise < { collectionEntities: CollectionEntity[], total: number } >;

    fetchCollectionsByFilter(collectionFilterModel: CollectionFilterModel): Promise < { collectionEntities: CollectionEntity[], total: number } >;
}
