import StorageHelper from '../../../../core/helpers/StorageHelper';
import UserEntity from '../../entities/UserEntity';
import UserRepo from '../../presentation/repos/UserRepo';

export default class UserStorageRepo implements UserRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchProfileByAddress(address: string): Promise < UserEntity > {
        const userJson = this.storageHelper.usersJson.find((json) => json.address === address);
        return userJson ? UserEntity.fromJson(userJson) : null;
    }

}
