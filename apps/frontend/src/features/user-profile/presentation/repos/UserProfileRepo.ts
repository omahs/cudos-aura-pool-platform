import UserProfileModel from '../../entities/UserProfileModel';

export default interface UserProfileRepo {

    fetchProfileByAddress(address: string, callback: (userProfileModel: UserProfileModel) => void);
}
