import { makeAutoObservable } from 'mobx';
import CollectionProfile from '../../../collections-marketplace/entities/CollectionProfile';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import NftPreviewsGridStore from '../../../nfts-explore/presentation/stores/NftPreviewsGridStore';

export default class CollectionViewPageStore {
    collectionRepo: CollectionRepo;

    collectionProfile: CollectionProfile;
    nftPreviewsGridStore: NftPreviewsGridStore;

    constructor(collectionRepo: CollectionRepo) {
        this.collectionRepo = collectionRepo;

        this.collectionProfile = null;
        this.nftPreviewsGridStore = null;

        makeAutoObservable(this);
    }

    innitiate(collectionId: string, nftPreviewsGridStore: NftPreviewsGridStore) {
        this.nftPreviewsGridStore = nftPreviewsGridStore;
        this.nftPreviewsGridStore.collectionId = collectionId;

        this.collectionRepo.getCollectionProfile(collectionId, (collectionProfile) => {
            this.collectionProfile = collectionProfile;
            this.nftPreviewsGridStore.fetchViewingModels();
        });
    }
}
