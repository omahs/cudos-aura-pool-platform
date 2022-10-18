import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import AdminEntity from '../../entities/AdminEntity';

export default class AdminPortalPageState {
    static PAGE_LOGIN = 1;
    static PAGE_FORGOTTEN_PASSWORD = 2;
    static PAGE_REQUEST_ACCOUNT = 3;
    static PAGE_CHANGE_PASSWORD = 4;

    page: number;
    adminEntity: AdminEntity;
    miningFarmEntity: MiningFarmEntity;

    constructor() {
        this.setPageLogin();

        makeAutoObservable(this);
    }

    setPageRequestAccount = () => {
        this.page = AdminPortalPageState.PAGE_REQUEST_ACCOUNT;
    }

    setPageLogin = () => {
        this.page = AdminPortalPageState.PAGE_LOGIN;
    }

    setPageForgottenPassword = () => {
        this.page = AdminPortalPageState.PAGE_FORGOTTEN_PASSWORD;
    }

    setPageChangePassword = () => {
        this.page = AdminPortalPageState.PAGE_CHANGE_PASSWORD;
    }

    isPageLogin(): boolean {
        return this.page === AdminPortalPageState.PAGE_LOGIN;
    }

    isPageRequestAdminAccount(): boolean {
        return this.page === AdminPortalPageState.PAGE_REQUEST_ACCOUNT;
    }

    isPageChangePassword(): boolean {
        return this.page === AdminPortalPageState.PAGE_CHANGE_PASSWORD;
    }

    changePassword(): {
        // TODO
    }
}
