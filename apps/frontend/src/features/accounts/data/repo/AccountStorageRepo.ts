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
        const currentSuperAdmins = this.storageHelper.superAdminsJson;

        let adminJson = null;
        let superAdminJson = null;
        let userJson = null;
        let accountJson = null;

        // admin login
        if (walletAddress === S.Strings.EMPTY) {
            adminJson = currentAdmins.find((json) => {
                return json.email === username
            });

            superAdminJson = currentSuperAdmins.find((json) => {
                return json.email === username
            });

            if (adminJson === undefined && superAdminJson === undefined) {
                throw Error('Account not found');
            }

            if (adminJson !== undefined) {
                userJson = currentUsers.find((json) => json.accountId === adminJson.accountId);
                accountJson = currentAccounts.find((json) => json.accountId === adminJson.accountId);
            } else if (superAdminJson !== undefined) {
                userJson = currentUsers.find((json) => json.accountId === superAdminJson.accountId);
                accountJson = currentAccounts.find((json) => json.accountId === superAdminJson.accountId);
            }

        } else {
            userJson = currentUsers.find((json) => json.address === walletAddress);
            if (userJson === undefined) {
                const lastAccountEntity = currentAccounts.last();
                const nextAccountId = 1 + (lastAccountEntity !== null ? parseInt(lastAccountEntity.accountId) : 0);

                const lastUserEntity = currentUsers.last();
                const nextUserId = 1 + (lastUserEntity !== null ? parseInt(lastUserEntity.userId) : 0);

                const accountEntity = new AccountEntity();
                accountEntity.accountId = nextAccountId.toString();
                accountEntity.timestampLastLogin = S.NOT_EXISTS;
                accountEntity.timestampRegister = Date.now() - 100000000;
                accountEntity.active = S.INT_FALSE;

                accountJson = AccountEntity.toJson(accountEntity);
                currentAccounts.push(accountJson);

                const userEntity = new UserEntity();
                userEntity.userId = nextUserId.toString();
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
        this.storageHelper.sessionSuperAdmin = superAdminJson ?? null;
        this.storageHelper.save();
    }

    async register(email: string, password: string): Promise < void > {
        const currentAccounts = this.storageHelper.accountsJson;
        const currentUsers = this.storageHelper.usersJson;
        const currentAdmins = this.storageHelper.adminsJson;

        const lastAccountEntity = currentAccounts.last();
        const nextAccountId = 1 + (lastAccountEntity !== null ? parseInt(lastAccountEntity.accountId) : 0);

        const lastUserEntity = currentUsers.last();
        const nextUserId = 1 + (lastUserEntity !== null ? parseInt(lastUserEntity.userId) : 0);

        const lastAdminEntity = currentAdmins.last();
        const nextAdminId = 1 + (lastAdminEntity !== null ? parseInt(lastAdminEntity.adminId) : 0);

        const accountEntity = new AccountEntity();
        accountEntity.accountId = nextAccountId.toString();
        accountEntity.type = AccountType.ADMIN;
        accountEntity.timestampLastLogin = S.NOT_EXISTS;
        accountEntity.timestampRegister = Date.now() - 100000000;
        accountEntity.active = S.INT_FALSE;

        currentAccounts.push(AccountEntity.toJson(accountEntity));

        const userEntity = new UserEntity();
        userEntity.userId = nextUserId.toString();
        userEntity.accountId = accountEntity.accountId;
        userEntity.name = S.Strings.EMPTY;
        userEntity.address = S.Strings.EMPTY;
        userEntity.totalBtcEarned = new BigNumber(0);
        userEntity.totalHashPower = 0;
        userEntity.timestampJoined = Date.now() - 100000000;

        currentUsers.push(UserEntity.toJson(userEntity));

        const adminEntity = new AdminEntity();
        adminEntity.adminId = nextAdminId.toString();
        adminEntity.accountId = accountEntity.accountId;
        adminEntity.email = email

        currentAdmins.push(AdminEntity.toJson(adminEntity));
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
        this.storageHelper.save();
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
