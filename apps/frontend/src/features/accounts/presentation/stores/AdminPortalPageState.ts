import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import AdminEntity from '../../entities/AdminEntity';

export default class AdminPortalPageState {
    static PAGE_LOGIN = 1;
    static PAGE_FORGOTTEN_PASSWORD = 2;
    static PAGE_REQUEST_ACCOUNT = 3;
    static PAGE_CHANGE_PASSWORD = 4;
    static PAGE_REGISTER_ACCOUNT = 5;

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

    setPageRegisterAdminAccount = () => {
        this.page = AdminPortalPageState.PAGE_REGISTER_ACCOUNT;
    }

    isPageLogin(): boolean {
        return this.page === AdminPortalPageState.PAGE_LOGIN;
    }

    isPageRequestAdminAccount(): boolean {
        return this.page === AdminPortalPageState.PAGE_REQUEST_ACCOUNT;
    }

    isPageRegisterAdminAccount(): boolean {
        return this.page === AdminPortalPageState.PAGE_REGISTER_ACCOUNT;
    }

    isPageChangePassword(): boolean {
        return this.page === AdminPortalPageState.PAGE_CHANGE_PASSWORD;
    }

    login = () => {
        // TODO: if admin check if approved, if not approved show not approvd page, if approved show change apssword page
        // if super admin send to approve accounts page
    }
}
