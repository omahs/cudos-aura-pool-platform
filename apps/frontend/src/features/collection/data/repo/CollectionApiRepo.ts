import NftEntity from '../../../nft/entities/NftEntity';
import CategoryEntity from '../../entities/CategoryEntity';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../../presentation/repos/CollectionRepo';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';
import CollectionApi from '../data-sources/CollectionApi';

export default class CollectionStorageRepo implements CollectionRepo {

    collectionApi: CollectionApi;

    constructor() {
        this.collectionApi = new CollectionApi();
    }

    async fetchCategories(): Promise < CategoryEntity [] > {
        return this.collectionApi.fetchCategories();
    }

    async fetchTopCollections(period: number): Promise < CollectionEntity[] > {
        return this.collectionApi.fetchTopCollections(period);
    }

    async fetchCollectionsByIds(idArray: string[]): Promise < CollectionEntity[] > {
        return this.collectionApi.fetchCollectionsByIds(idArray);
    }

    async fetchCollectionById(collectionId: string): Promise < CollectionEntity > {
        const collectionEntities = await this.fetchCollectionsByIds([collectionId]);
        return collectionEntities.length === 1 ? collectionEntities[0] : null;
    }

    async fetchCollectionsByFilter(collectionFilterModel: CollectionFilterModel): Promise < { collectionEntities: CollectionEntity[], total: number } > {
        return this.collectionApi.fetchCollectionsByFilter(collectionFilterModel);
    }

    async creditCollection(collectionEntity: CollectionEntity, nftEntities: NftEntity[]) {
        const result = await this.collectionApi.creditCollection(collectionEntity, nftEntities);
        Object.assign(collectionEntity, result.collectionEntity);
        result.nftEntities.forEach((nftEntity, i) => {
            Object.assign(nftEntities[i], nftEntity);
        });
    }

}
