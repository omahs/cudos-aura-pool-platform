import { makeAutoObservable } from 'mobx';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';
import AccountRepo from '../repos/AccountRepo';

export default class AccountSessionStore {

    walletStore: WalletStore;
    accountRepo: AccountRepo;

    inited: boolean;
    accountEntity: AccountEntity;
    userEntity: UserEntity;
    adminEntity: AdminEntity;
    superAdminEntity: SuperAdminEntity;

    constructor(walletStore: WalletStore, accountRepo: AccountRepo) {
        this.walletStore = walletStore;
        this.accountRepo = accountRepo;

        this.inited = false;
        this.accountEntity = new AccountEntity();
        this.userEntity = new UserEntity();
        this.adminEntity = new AdminEntity();
        this.superAdminEntity = new SuperAdminEntity();

        makeAutoObservable(this);
    }

    isUser(): boolean {
        if (this.accountEntity === null) {
            return false;
        }

        if (this.accountEntity.isUser() === true || this.accountEntity.isAdmin() === true) {
            return this.userEntity !== null;
        }

        return false;
    }

    isAdmin(): boolean {
        if (this.accountEntity === null) {
            return false;
        }

        if (this.accountEntity.isAdmin() === true) {
            return this.userEntity !== null;
        }

        return false;
    }

    async loadSessionAccountsAndSyncWalletStore() {
        await this.loadSessionAccounts();
        if (this.isUser() === true) {
            await this.walletStore.tryConnect();

            if (this.userEntity.address !== this.walletStore.getAddress()) {
                await this.walletStore.disconnect();
            }
        }
    }

    async loadSessionAccounts() {
        const { accountEntity, userEntity, adminEntity, superAdminEntity } = await this.accountRepo.fetchSessionAccounts();
        this.accountEntity = accountEntity;
        this.userEntity = userEntity;
        this.adminEntity = adminEntity;
        this.superAdminEntity = superAdminEntity;

        this.inited = true;
    }

    login = async (username: string, password: string, walletAddress: string, signedTx: any): Promise < void > => {
        try {
            await this.accountRepo.login(username, password, walletAddress, signedTx);
        } finally {
            await this.loadSessionAccountsAndSyncWalletStore();
        }
    }

    register = async (email: string, password: string, fullname: string): Promise < void > => {
        await this.accountRepo.register(email, password, fullname);
    }

    // TODO: use session token for password change
    changePassword = async (password: string, passwordRepeat: string): Promise < void > => {
        // await this.accountRepo.changePassword(this.userEntity.name, token, password, passwordRepeat);
    }

    async logout(): Promise < void > {
        await this.walletStore.disconnect();
        this.accountRepo.logout();
    }

    isInited(): boolean {
        return this.inited;
    }

}
