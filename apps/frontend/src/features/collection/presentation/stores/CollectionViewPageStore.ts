import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../repos/CollectionRepo';
import NftPreviewsGridStore from '../../../nft/presentation/stores/NftPreviewsGridStore';

export default class CollectionViewPageStore {
    collectionRepo: CollectionRepo;

    collectionEntity: CollectionEntity;
    nftPreviewsGridStore: NftPreviewsGridStore;

    constructor(collectionRepo: CollectionRepo) {
        this.collectionRepo = collectionRepo;

        this.collectionEntity = null;
        this.nftPreviewsGridStore = null;

        makeAutoObservable(this);
    }

    init(collectionId: string, nftPreviewsGridStore: NftPreviewsGridStore) {
        this.nftPreviewsGridStore = nftPreviewsGridStore;
        this.nftPreviewsGridStore.collectionId = collectionId;

        this.collectionRepo.getCollectionEntity(collectionId, (collectionEntity) => {
            this.collectionEntity = collectionEntity;
            this.nftPreviewsGridStore.fetchViewingModels();
        });
    }
}
