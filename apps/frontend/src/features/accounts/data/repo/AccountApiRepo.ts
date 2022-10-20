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

    async login(username: string, password: string, cudosWalletAddress: string, signedTx: any): Promise < void > {
        return this.accountApi.login(username, password, cudosWalletAddress, signedTx);
    }

    async register(email: string, password: string, name: string, cudosWalletAddress: string, signedTx: any): Promise < void > {
        return this.accountApi.register(email, password, name, cudosWalletAddress, signedTx);
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
