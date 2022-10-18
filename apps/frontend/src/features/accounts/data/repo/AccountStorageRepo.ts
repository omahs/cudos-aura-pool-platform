import BigNumber from 'bignumber.js';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import AccountEntity, { AccountType } from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';
import AccountRepo from '../../presentation/repos/AccountRepo';

export default class AccountStorageRepo implements AccountRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async login(username: string, password: string, walletAddress: string, signedTx: any): Promise < void > {
        const accountEntity = new AccountEntity();
        accountEntity.accountId = '1';
        accountEntity.type = AccountType.User;

        const userEntity = new UserEntity();
        userEntity.accountId = accountEntity.accountId;
        userEntity.name = 'MockedUser';
        userEntity.address = walletAddress;
        userEntity.totalBtcEarned = new BigNumber(0);
        userEntity.totalHashPower = 0;
        userEntity.timestampJoined = Date.now() - 100000000;

        this.storageHelper.sessionAccount = AccountEntity.toJson(accountEntity);
        this.storageHelper.sessionUser = UserEntity.toJson(userEntity);
        this.storageHelper.save();
    }

    async logout(): Promise < void > {
        this.storageHelper.sessionAccount = null;
        this.storageHelper.sessionUser = null;
        this.storageHelper.sessionAdmin = null;
        this.storageHelper.sessionSuperAdmin = null;
    }

    async fetchSessionAccounts(): Promise < { accountEntity: AccountEntity; userEntity: UserEntity; adminEntity: AdminEntity; superAdminEntity: SuperAdminEntity; } > {
        return {
            accountEntity: AccountEntity.fromJson(this.storageHelper.sessionAccount),
            userEntity: UserEntity.fromJson(this.storageHelper.sessionUser),
            adminEntity: AdminEntity.fromJson(this.storageHelper.sessionAdmin),
            superAdminEntity: SuperAdminEntity.fromJson(this.storageHelper.sessionSuperAdmin),
        }
    }

}
