import { makeAutoObservable, runInAction } from 'mobx';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';
import AccountRepo from '../repos/AccountRepo';

export default class AccountSessionStore {

    walletStore: WalletStore;
    accountRepo: AccountRepo;
    miningFarmRepo: MiningFarmRepo;

    inited: boolean;
    approvedMiningFarm: boolean;
    accountEntity: AccountEntity;
    userEntity: UserEntity;
    adminEntity: AdminEntity;
    superAdminEntity: SuperAdminEntity;

    constructor(walletStore: WalletStore, accountRepo: AccountRepo, miningFarmRepo: MiningFarmRepo) {
        this.walletStore = walletStore;
        this.accountRepo = accountRepo;
        this.miningFarmRepo = miningFarmRepo;

        this.inited = false;
        this.approvedMiningFarm = false;
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
            return this.adminEntity !== null;
        }

        return false;
    }

    isSuperAdmin(): boolean {
        if (this.accountEntity === null) {
            return false;
        }

        if (this.accountEntity.isSuperAdmin() === true) {
            return this.superAdminEntity !== null;
        }

        return false;
    }

    hasApprovedMiningFarm(): boolean {
        return this.approvedMiningFarm;
    }

    async login(username: string, password: string, cudosWalletAddress: string, signedTx: any): Promise < void > {
        try {
            await this.accountRepo.login(username, password, cudosWalletAddress, signedTx);
        } finally {
            await this.loadSessionAccountsAndSync();
        }
    }

    async register(email: string, password: string, name: string, cudosWalletAddress: string, signedTx: any): Promise < void > {
        await this.accountRepo.register(email, password, name, cudosWalletAddress, signedTx);
    }

    async logout(): Promise < void > {
        await this.walletStore.disconnect();
        this.accountRepo.logout();
    }

    async confirmBitcoinAddress(): Promise < void > {
        try {
            this.accountRepo.confirmBitcoinAddress();
        } finally {
            await this.loadSessionAccountsAndSync();
        }
    }

    // TODO: use session token for password change
    async changePassword(password: string, passwordRepeat: string): Promise < void > {
        // await this.accountRepo.changePassword(this.userEntity.name, token, password, passwordRepeat);
    }

    async loadSessionAccountsAndSync() {
        await this.loadSessionAccounts();
        if (this.isUser() === true) {
            await this.walletStore.tryConnect();

            if (this.userEntity.cudosWalletAddress !== this.walletStore.getAddress()) {
                await this.walletStore.disconnect();
            }
            console.log('Logged as user => wallet:', this.walletStore.isConnected())
        } else if (this.isAdmin() === true) {
            await this.walletStore.tryConnect();

            if (this.adminEntity.cudosWalletAddress !== this.walletStore.getAddress()) {
                await this.walletStore.disconnect();
            }

            const miningFarmEntity = await this.miningFarmRepo.fetchMiningFarmByAccountId(this.accountEntity.accountId);
            this.approvedMiningFarm = miningFarmEntity?.isApproved() ?? false;

            console.log('Logged as admin => wallet:', this.walletStore.isConnected())
        } else if (this.isSuperAdmin() === true) {
            console.log('Logged as super admin => wallet:', false);
        }
    }

    async loadSessionAccounts() {
        const { accountEntity, userEntity, adminEntity, superAdminEntity } = await this.accountRepo.fetchSessionAccounts();
        runInAction(() => {
            this.accountEntity = accountEntity;
            this.userEntity = userEntity;
            this.adminEntity = adminEntity;
            this.superAdminEntity = superAdminEntity;

            this.inited = true;
        });
    }

    isInited(): boolean {
        return this.inited;
    }

}
