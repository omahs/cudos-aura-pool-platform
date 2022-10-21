import { makeAutoObservable } from 'mobx';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import CollectionEntity from '../../entities/CollectionEntity';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import CollectionRepo from '../repos/CollectionRepo';

export default class CreditCollectionNftsPageStore {
    accountSessionStore: AccountSessionStore;
    miningFarmRepo: MiningFarmRepo;
    collectionRepo: CollectionRepo

    collectionEntity: CollectionEntity;
    miningFarmEntity: MiningFarmEntity;

    constructor(accountSessionStore: AccountSessionStore, miningFarmRepo: MiningFarmRepo, collectionRepo: CollectionRepo) {
        this.accountSessionStore = accountSessionStore;
        this.miningFarmRepo = miningFarmRepo;
        this.collectionRepo = collectionRepo;

        this.collectionEntity = null;
        this.miningFarmEntity = null;

        makeAutoObservable(this);
    }

    async init(collectionId: string) {
        this.collectionEntity = await this.collectionRepo.fetchCollectionById(collectionId);
        this.miningFarmEntity = await this.miningFarmRepo.fetchMiningFarmById(this.collectionEntity.farmId);
    }

    isCollectionEditable() {
        return this.accountSessionStore.isAdmin()
        && this.miningFarmEntity.accountId === this.accountSessionStore.accountEntity.accountId
        && this.collectionEntity.farmId === this.miningFarmEntity.id;
    }
}
