import S from '../../../../core/utilities/Main';
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

        const currentAccounts = this.storageHelper.accountsJson;
        const currentUsers = this.storageHelper.usersJson;
        const currentAdmins = this.storageHelper.adminsJson;

        let adminJson = null;
        let userJson = null;
        let accountJson = null;

        // admin login
        if (walletAddress === S.Strings.EMPTY || walletAddress === null || walletAddress === undefined) {
            adminJson = currentAdmins.find((json) => {
                return json.email === username
            });

            if (adminJson === undefined) {
                throw Error('Account not found');
            }

            userJson = currentUsers.find((json) => json.accountId === adminJson.accountId);
            accountJson = currentAccounts.find((json) => json.accountId === adminJson.accountId);
        } else {
            userJson = currentUsers.find((json) => json.address === walletAddress);
            if (userJson === undefined) {
                const accountEntity = new AccountEntity();

                accountEntity.accountId = `${currentAccounts.length + 1}`;
                accountEntity.type = AccountType.Admin;
                accountEntity.timestampLastLogin = S.NOT_EXISTS;
                accountEntity.timestampRegister = Date.now() - 100000000;
                accountEntity.active = S.INT_FALSE;

                accountJson = AccountEntity.toJson(accountEntity);
                currentAccounts.push(accountJson);

                const userEntity = new UserEntity();

                userEntity.userId = `${currentUsers.length + 1}`;
                userEntity.accountId = accountEntity.accountId;
                userEntity.name = S.Strings.EMPTY;
                userEntity.address = walletAddress;
                userEntity.totalBtcEarned = new BigNumber(0);
                userEntity.totalHashPower = 0;
                userEntity.timestampJoined = Date.now() - 100000000;

                userJson = UserEntity.toJson(userEntity);
                currentUsers.push(userJson);
            } else {
                accountJson = currentAccounts.find((json) => json.accountId === userJson.accountId);
            }
        }

        this.storageHelper.sessionAccount = accountJson ?? null;
        this.storageHelper.sessionUser = userJson ?? null;
        this.storageHelper.sessionAdmin = adminJson ?? null;
        this.storageHelper.save();
    }

    async register(email: string, password: string, repeatPassword: string): Promise < void > {
        const currentAccounts = this.storageHelper.accountsJson;
        const currentUsers = this.storageHelper.usersJson;
        const currentAdmins = this.storageHelper.adminsJson;

        const accountEntity = new AccountEntity();

        accountEntity.accountId = `${currentAccounts.length + 1}`;
        accountEntity.type = AccountType.Admin;
        accountEntity.timestampLastLogin = S.NOT_EXISTS;
        accountEntity.timestampRegister = Date.now() - 100000000;
        accountEntity.active = S.INT_FALSE;

        const accountJson = AccountEntity.toJson(accountEntity);
        currentAccounts.push(accountJson);

        const userEntity = new UserEntity();

        userEntity.userId = `${currentUsers.length + 1}`;
        userEntity.accountId = accountEntity.accountId;
        userEntity.name = S.Strings.EMPTY;
        userEntity.address = S.Strings.EMPTY;
        userEntity.totalBtcEarned = new BigNumber(0);
        userEntity.totalHashPower = 0;
        userEntity.timestampJoined = Date.now() - 100000000;

        const userJson = UserEntity.toJson(userEntity);
        currentUsers.push(userJson);

        const adminEntity = new AdminEntity();

        adminEntity.adminId = `${currentAdmins.length + 1}`;
        adminEntity.accountId = accountEntity.accountId;
        adminEntity.email = email

        const adminJson = AdminEntity.toJson(adminEntity)
        currentAdmins.push(adminJson);
        this.storageHelper.save();
    }

    async changePassword(username: string, token: string, newPassword: string, newPasswordRepeat: string): Promise < void > {
        // TODO
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
