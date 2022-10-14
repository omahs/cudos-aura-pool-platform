import StorageHelper from '../../../../core/helpers/StorageHelper';
import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';
import AccountRepo from '../../presentation/repos/AccountRepo';

export default class AccountStorageRepo implements AccountRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchSessionAccounts(address: string): Promise < { accountEntity: AccountEntity; userEntity: UserEntity; adminEntity: AdminEntity; superAdminEntity: SuperAdminEntity; } > {
        const userJson = this.storageHelper.usersJson.find((json) => json.address === address);
        const userEntity = userJson ? UserEntity.fromJson(userJson) : new UserEntity();

        return {
            accountEntity: new AccountEntity(),
            userEntity,
            adminEntity: new AdminEntity(),
            superAdminEntity: new SuperAdminEntity(),
        }
    }

}
