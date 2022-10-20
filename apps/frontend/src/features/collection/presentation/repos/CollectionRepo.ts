import CategoryEntity from '../../entities/CategoryEntity';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';

export default interface CollectionRepo {

    fetchCategories(): Promise < CategoryEntity[] >;

    fetchTopCollections(period: number): Promise < CollectionEntity[] >;

    fetchCollectionsByIds(idArray: string[]): Promise < CollectionEntity[] >;

    fetchCollectionById(collectionId: string): Promise < CollectionEntity >;

    fetchCollectionsByFilter(collectionFilterModel: CollectionFilterModel): Promise < { collectionEntities: CollectionEntity[], total: number } >;

    approveCollections(collectionIds: string[]): Promise < void >;
}
