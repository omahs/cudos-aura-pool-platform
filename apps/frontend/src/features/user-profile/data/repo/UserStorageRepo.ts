import StorageHelper from '../../../../core/helpers/StorageHelper';
import UserEntity from '../../entities/UserEntity';
import UserRepo from '../../presentation/repos/UserRepo';

export default class UserStorageRepo implements UserRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }
    fetchProfileByAddress(address: string, callback: (userEntity: UserEntity) => void) {
        const userJson = this.storageHelper.usersJson.find((json) => json.address === address);
        callback(userJson ? UserEntity.fromJson(userJson) : null);
    }

}
