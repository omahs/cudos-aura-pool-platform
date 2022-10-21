import GridViewState from '../../../../core/presentation/stores/GridViewState';
import { makeAutoObservable, runInAction } from 'mobx';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import AdminEntity from '../../../accounts/entities/AdminEntity';
import ImageEntity from '../../../upload-file/entities/ImageEntity';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import RepoStore from 'apps/frontend/src/core/presentation/stores/RepoStore';

export default class CreditMiningFarmPageState {
    static STEP_FARM_DETAILS = 1;
    static STEP_REVIEW = 2;
    static STEP_SUCCESS = 3;

    accountSessionStore: AccountSessionStore;
    repoStore: RepoStore;

    step: number;
    miningFarmEntity: MiningFarmEntity;
    imageEntities: ImageEntity[];

    constructor(accountSessionStore: AccountSessionStore, repoStore: RepoStore) {
        this.accountSessionStore = accountSessionStore;
        this.repoStore = repoStore;

        this.setStepFarmDetails();
        this.miningFarmEntity = null;
        this.imageEntities = [];

        makeAutoObservable(this);
    }

    fetch = async () => {
        const accountId = this.accountSessionStore.accountEntity.accountId;
        let miningFarmEntity = await this.repoStore.miningFarmRepo.fetchMiningFarmByAccountId(accountId);

        if (miningFarmEntity === null) {
            miningFarmEntity = new MiningFarmEntity();
            miningFarmEntity.accountId = accountId;
        }

        this.miningFarmEntity = miningFarmEntity;
    }

    setStepFarmDetails = () => {
        this.step = CreditMiningFarmPageState.STEP_FARM_DETAILS;
    }

    setStepReview = () => {
        this.step = CreditMiningFarmPageState.STEP_REVIEW;
    }

    setStepSuccess = () => {
        this.step = CreditMiningFarmPageState.STEP_SUCCESS;
    }

    isStepFarmDetails(): boolean {
        return this.step === CreditMiningFarmPageState.STEP_FARM_DETAILS;
    }

    isStepReview(): boolean {
        return this.step === CreditMiningFarmPageState.STEP_REVIEW;
    }

    isStepSuccess(): boolean {
        return this.step === CreditMiningFarmPageState.STEP_SUCCESS;
    }

    finishCreation = () => {
        // TODO
        this.setStepSuccess();
    }
}
