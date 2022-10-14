import UserEntity from '../../entities/UserEntity';
import UserRepo from '../../presentation/repos/UserRepo';
import UserApi from '../data-sources/UserApi';

export default class UserApiRepo implements UserRepo {

    userApi: UserApi;

    constructor() {
        this.userApi = new UserApi();
    }

    async fetchProfileByAddress(address: string): Promise < UserEntity > {
        return this.userApi.fetchProfileByAddress(address);
    }

}
