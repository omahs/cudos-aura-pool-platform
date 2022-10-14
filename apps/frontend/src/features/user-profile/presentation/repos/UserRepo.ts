import UserEntity from '../../entities/UserEntity';

export default interface UserRepo {

    fetchProfileByAddress(address: string): Promise < UserEntity >;

}
