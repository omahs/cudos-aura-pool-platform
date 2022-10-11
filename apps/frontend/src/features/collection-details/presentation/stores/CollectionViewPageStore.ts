import { makeAutoObservable } from 'mobx';
import CollectionProfile from '../../../collections-marketplace/entities/CollectionProfile';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';

export default class CollectionViewPageStore {
    collectionRepo: CollectionRepo;

    collectionProfile: CollectionProfile

    constructor(collectionRepo: CollectionRepo) {
        this.collectionRepo = collectionRepo;

        this.collectionProfile = null;

        makeAutoObservable(this);
    }

    innitiate(collectionId: string) {
        this.collectionRepo.getCollectionProfile(collectionId, (collectionProfile) => {
            this.collectionProfile = collectionProfile;
        });
    }
}
