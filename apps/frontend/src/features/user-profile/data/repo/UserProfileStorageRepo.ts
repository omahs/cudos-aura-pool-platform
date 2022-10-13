import StorageHelper from '../../../../core/helpers/StorageHelper';
import UserProfileEntity from '../../entities/UserProfileEntity';
import UserProfileRepo from '../../presentation/repos/UserProfileRepo';

export default class UserProfileStorageRepo implements UserProfileRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }
    fetchProfileByAddress(address: string, callback: (userProfileentity: UserProfileEntity) => void) {
        const profileJson = this.storageHelper.userProfilesJson.find((json) => json.address === address);
        callback(profileJson ? UserProfileEntity.fromJson(profileJson) : null);
    }

}
