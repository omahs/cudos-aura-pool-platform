import UserProfileEntity from '../../entities/UserProfileEntity';

export default interface UserProfileRepo {

    fetchProfileByAddress(address: string, callback: (userProfileModel: UserProfileEntity) => void);
}
