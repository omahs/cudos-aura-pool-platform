import { makeAutoObservable } from 'mobx';

export default class AdminPortalPageState {
    static PAGE_LOGIN = 1;
    static PAGE_FORGOTTEN_PASSWORD = 2;
    static PAGE_REQUEST_ACCOUNT = 3;

    page: number;

    constructor() {
        // this.setPageLogin();
        this.setPageRequestAccount();

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

    isPageLogin(): boolean {
        return this.page === AdminPortalPageState.PAGE_LOGIN;
    }

    isPageRequestAdminAccount(): boolean {
        return this.page === AdminPortalPageState.PAGE_REQUEST_ACCOUNT;
    }
}
