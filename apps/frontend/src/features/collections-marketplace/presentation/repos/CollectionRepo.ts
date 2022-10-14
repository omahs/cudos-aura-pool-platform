import CollectionPreviewEntity from '../../entities/CollectionPreviewEntity';
import CollectionProfileEntity from '../../entities/CollectionProfileEntity';

export default interface CollectionRepo {

    getCategories(callback: (categories: string[]) => void);

    getTopCollections(period: number, callback: (collections: CollectionPreviewEntity[]) => void);

    getAllCollections(callback: (collections: CollectionPreviewEntity[]) => void);

    getCollectionsByIds(idArray: string[]): Promise<CollectionProfileEntity[]>;

    getCollectionProfile(collectionId: string, callback: (collection: CollectionProfileEntity) => void);

    getCollectionsByFarmIdSortedPaginated(farmId: string, sortKey: string, from: number, count: number, callBack: (collectionPreviews: CollectionPreviewEntity[], total: number) => void);
}
