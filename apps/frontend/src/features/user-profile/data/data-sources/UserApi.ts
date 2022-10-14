import UserEntity from '../../entities/UserEntity';
import UserRepo from '../../presentation/repos/UserRepo';

export default class UserApi implements UserRepo {

    async fetchProfileByAddress(address: string): Promise < UserEntity > {
        return null;
    }

}
