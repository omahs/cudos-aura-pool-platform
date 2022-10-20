import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';
import AccountRepo from '../../presentation/repos/AccountRepo';
import AccountApi from '../data-sources/AccountApi';

export default class AccountStorageRepo implements AccountRepo {

    accountApi: AccountApi;

    constructor() {
        this.accountApi = new AccountApi();
    }

    async login(username: string, password: string, walletAddress: string, signedTx: any): Promise < void > {
        return this.accountApi.login(username, password, walletAddress, signedTx);
    }

    async register(username: string, password: string, fullname: string): Promise < void > {
        return this.accountApi.register(username, password, fullname);
    }

    async changePassword(username: string, token: string, newPassword: string, newPasswordRepeat: string): Promise < void > {
        return this.accountApi.changePassword(username, token, newPassword, newPasswordRepeat);
    }

    async logout(): Promise < void > {
        return this.accountApi.logout();
    }

    async fetchSessionAccounts(): Promise < { accountEntity: AccountEntity; userEntity: UserEntity; adminEntity: AdminEntity; superAdminEntity: SuperAdminEntity; } > {
        return this.accountApi.fetchSessionAccounts();
    }

}
