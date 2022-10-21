import { makeAutoObservable, runInAction } from 'mobx';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import ImageEntity from '../../../upload-file/entities/ImageEntity';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import MiningFarmRepo from '../repos/MiningFarmRepo';

export default class CreditMiningFarmDetailsPageState {

    static STEP_FARM_DETAILS = 1;
    static STEP_REVIEW = 2;
    static STEP_SUCCESS = 3;

    accountSessionStore: AccountSessionStore;
    miningFarmRepo: MiningFarmRepo;

    step: number;
    miningFarmEntity: MiningFarmEntity;
    imageEntities: ImageEntity[];

    constructor(accountSessionStore: AccountSessionStore, miningFarmRepo: MiningFarmRepo) {
        this.accountSessionStore = accountSessionStore;
        this.miningFarmRepo = miningFarmRepo;

        this.setStepFarmDetails();
        this.miningFarmEntity = null;
        this.imageEntities = [];

        makeAutoObservable(this);
    }

    async fetch() {
        let miningFarmEntity = await this.miningFarmRepo.fetchMiningFarmBySessionAccountId();

        runInAction(() => {
            if (miningFarmEntity === null) {
                miningFarmEntity = new MiningFarmEntity();
            }

            this.miningFarmEntity = miningFarmEntity;
        });
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

    finishCreation = async () => {
        this.miningFarmEntity.accountId = this.accountSessionStore.accountEntity.accountId;
        this.miningFarmEntity.markApproved();
        await this.miningFarmRepo.creditMiningFarm(this.miningFarmEntity);

        console.log(this.miningFarmEntity);
        runInAction(() => {
            this.setStepSuccess();
        });
    }
}
