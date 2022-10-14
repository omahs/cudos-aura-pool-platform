import { makeAutoObservable } from 'mobx';
import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';
import AccountRepo from '../repos/AccountRepo';

export default class AccountSessionStore {

    accountRepo: AccountRepo;

    inited: boolean;
    accountEntity: AccountEntity;
    userEntity: UserEntity;
    adminEntity: AdminEntity;
    superAdminEntity: SuperAdminEntity;

    constructor(accountRepo: AccountRepo) {
        this.accountRepo = accountRepo;

        this.inited = false;
        this.accountEntity = new AccountEntity();
        this.userEntity = new UserEntity();
        this.adminEntity = new AdminEntity();
        this.superAdminEntity = new SuperAdminEntity();

        makeAutoObservable(this);
    }

    async loadSessionAccounts() {
        this.inited = true;

        const { accountEntity, userEntity, adminEntity, superAdminEntity } = await this.accountRepo.fetchSessionAccounts('');
        this.accountEntity = accountEntity;
        this.userEntity = userEntity;
        this.adminEntity = adminEntity;
        this.superAdminEntity = superAdminEntity;
    }

    isInited(): boolean {
        return this.inited;
    }

}
