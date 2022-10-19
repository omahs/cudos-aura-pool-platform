import RepoStore from '../../../../core/presentation/stores/RepoStore';
import { makeAutoObservable } from 'mobx';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import CollectionEntity from '../../entities/CollectionEntity';

export default class AddNftsToCollectionPageState {
    repoStore: RepoStore;
    accountSessionStore: AccountSessionStore;

    collectionEntity: CollectionEntity;
    miningFarmEntity: MiningFarmEntity;

    constructor(repoStore: RepoStore, accountSessionStore: AccountSessionStore) {
        this.repoStore = repoStore;
        this.accountSessionStore = accountSessionStore;

        this.collectionEntity = null;
        this.miningFarmEntity = null;

        makeAutoObservable(this);
    }

    async init(collectionId: string) {
        this.collectionEntity = await this.repoStore.collectionRepo.fetchCollectionById(collectionId);
        this.miningFarmEntity = await this.repoStore.miningFarmRepo.fetchMiningFarmById(this.collectionEntity.farmId);
    }

    isCollectionEditable() {
        return this.accountSessionStore.isAdmin()
        && this.miningFarmEntity.accountId === this.accountSessionStore.accountEntity.accountId
        && this.collectionEntity.farmId === this.miningFarmEntity.id;
    }
}
