import GridViewState from '../../../../core/presentation/stores/GridViewState';
import { makeAutoObservable, runInAction } from 'mobx';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import AdminEntity from '../../../accounts/entities/AdminEntity';
import ImageEntity from '../../../upload-file/entities/ImageEntity';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import RepoStore from '../../../../core/presentation/stores/RepoStore';

export default class CreditMiningFarmDetailsPageState {
    static STEP_FARM_DETAILS = 1;
    static STEP_REVIEW = 2;
    static STEP_SUCCESS = 3;

    accountSessionStore: AccountSessionStore;
    repoStore: RepoStore;

    step: number;
    miningFarmEntity: MiningFarmEntity;
    imageEntities: ImageEntity[];
    isNewFarm: boolean;

    constructor(accountSessionStore: AccountSessionStore, repoStore: RepoStore) {
        this.accountSessionStore = accountSessionStore;
        this.repoStore = repoStore;

        this.setStepFarmDetails();
        this.miningFarmEntity = null;
        this.imageEntities = [];
        this.isNewFarm = false;

        makeAutoObservable(this);
    }

    fetch = async () => {
        const accountId = this.accountSessionStore.accountEntity.accountId;
        let miningFarmEntity = await this.repoStore.miningFarmRepo.fetchMiningFarmBySessionAccountId();

        if (miningFarmEntity === null) {
            miningFarmEntity = new MiningFarmEntity();
            miningFarmEntity.accountId = accountId;
            this.isNewFarm = true;
        }

        this.miningFarmEntity = miningFarmEntity;
    }

    setStepFarmDetails = () => {
        this.step = CreditMiningFarmDetailsPageState.STEP_FARM_DETAILS;
    }

    setStepReview = () => {
        this.step = CreditMiningFarmDetailsPageState.STEP_REVIEW;
    }

    setStepSuccess = () => {
        this.step = CreditMiningFarmDetailsPageState.STEP_SUCCESS;
    }

    isStepFarmDetails(): boolean {
        return this.step === CreditMiningFarmDetailsPageState.STEP_FARM_DETAILS;
    }

    isStepReview(): boolean {
        return this.step === CreditMiningFarmDetailsPageState.STEP_REVIEW;
    }

    isStepSuccess(): boolean {
        return this.step === CreditMiningFarmDetailsPageState.STEP_SUCCESS;
    }

    finishCreation = () => {
        // TODO
        this.setStepSuccess();
    }
}
