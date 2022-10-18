import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import AdminEntity from '../../entities/AdminEntity';

export default class RequestAdminAccountPageState {
    static STEP_ACCOUNT = 1;
    static STEP_FARM_DETAILS = 2;
    static STEP_FINISH = 3;

    step: number;
    adminEntity: AdminEntity;
    miningFarmEntity: MiningFarmEntity;

    constructor() {
        this.setStepAccount();
        this.adminEntity = new AdminEntity();
        this.miningFarmEntity = new MiningFarmEntity();

        makeAutoObservable(this);
    }

    setStepAccount = () => {
        this.step = RequestAdminAccountPageState.STEP_ACCOUNT;
    }

    setStepFarmDetails = () => {
        this.step = RequestAdminAccountPageState.STEP_FARM_DETAILS;
    }

    setStepFinish = () => {
        this.step = RequestAdminAccountPageState.STEP_FINISH;
    }

    isStepAccount(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_ACCOUNT;
    }

    isStepFarmDetails(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_FARM_DETAILS;
    }

    isStepFinish(): boolean {
        return this.step === RequestAdminAccountPageState.STEP_FINISH;
    }
}
