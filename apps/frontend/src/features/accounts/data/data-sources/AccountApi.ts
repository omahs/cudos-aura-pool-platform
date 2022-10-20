import AccountEntity from '../../entities/AccountEntity';
import AdminEntity from '../../entities/AdminEntity';
import SuperAdminEntity from '../../entities/SuperAdminEntity';
import UserEntity from '../../entities/UserEntity';

export default class AccountApi {

    async login(username: string, password: string, walletAddress: string, signedTx: any): Promise < void > {
        return null;
    }

    async register(username: string, password: string, fullname: string): Promise < void > {
        return null;
    }

    async changePassword(username: string, token: string, newPassword: string, newPasswordRepeat: string): Promise < void > {
        return null;
    }

    async logout(): Promise < void > {
        return null;
    }

    async fetchSessionAccounts(): Promise < { accountEntity: AccountEntity; userEntity: UserEntity; adminEntity: AdminEntity; superAdminEntity: SuperAdminEntity; } > {
        return null;
    }

}
