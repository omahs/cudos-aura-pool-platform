import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';

export default interface AccountRepo {

    login(username: string, password: string, cudosWalletAddress: string, signedTx: any): Promise < void >;
    register(email: string, password: string, name: string, cudosWalletAddress: string, signedTx: any): Promise < void >;
    changePassword(username: string, token: string, newPassword: string, newPasswordRepeat: string): Promise < void > ;
    logout(): Promise < void >;
    fetchSessionAccounts(): Promise < { accountEntity: AccountEntity, userEntity: UserEntity, adminEntity: AdminEntity, superAdminEntity: SuperAdminEntity } >;

}
