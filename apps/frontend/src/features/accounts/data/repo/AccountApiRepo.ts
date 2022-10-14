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

    async fetchSessionAccounts(address: string): Promise < { accountEntity: AccountEntity; userEntity: UserEntity; adminEntity: AdminEntity; superAdminEntity: SuperAdminEntity; } > {
        return this.accountApi.fetchSessionAccounts(address);
    }

}
