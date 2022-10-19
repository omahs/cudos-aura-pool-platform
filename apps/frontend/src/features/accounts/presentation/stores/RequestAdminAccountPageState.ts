import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import ImageEntity from '../../../upload-file/entities/ImageEntity';
import AdminEntity from '../../entities/AdminEntity';

export default class RequestAdminAccountPageState {
    static STEP_ACCOUNT = 1;
    static STEP_FARM_DETAILS = 2;
    static STEP_REVIEW = 3;
    static STEP_SUCCESS = 4;

    step: number;
    adminEntity: AdminEntity;
    miningFarmEntity: MiningFarmEntity;
    imageEntities: ImageEntity[];

    constructor() {
        this.setStepAccount();
        this.adminEntity = new AdminEntity();
        this.miningFarmEntity = new MiningFarmEntity();
        this.imageEntities = [];

        makeAutoObservable(this);
    }

    setStepAccount = () => {
        this.step = RequestAdminAccountPageState.STEP_ACCOUNT;
    }

    setStepFarmDetails = () => {
        this.step = RequestAdminAccountPageState.STEP_FARM_DETAILS;
    }

    setStepReview = () => {
        this.step = RequestAdminAccountPageState.STEP_REVIEW;
    }

    setStepSuccess = () => {
        this.step = RequestAdminAccountPageState.STEP_SUCCESS;
    }

    isStepAccount(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_ACCOUNT;
    }

    isStepFarmDetails(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_FARM_DETAILS;
    }

    isStepReview(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_REVIEW;
    }

    isStepSuccess(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_SUCCESS;
    }

    finishCreation = () => {
        // TODO
        this.setStepSuccess();
    }
}
