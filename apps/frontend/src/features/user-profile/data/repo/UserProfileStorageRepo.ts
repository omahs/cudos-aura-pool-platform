import StorageHelper from '../../../../core/helpers/StorageHelper';
import UserProfileModel from '../../entities/UserProfileModel';
import UserProfileRepo from '../../presentation/repos/UserProfileRepo';

export default class UserProfileStorageRepo implements UserProfileRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }
    fetchProfileByAddress(address: string, callback: (UserProfileModel) => void) {
        const profileJson = this.storageHelper.userProfilesJson.find((json) => json.address === address);

        callback(UserProfileModel.fromJson(profileJson));
    }

}
