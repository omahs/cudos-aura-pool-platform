import S from '../../../core/utilities/Main';

export enum AccountType {
    User = 1,
    Admin = 2,
    SuperAdmin = 3,
}

export default class AccountEntity {

    accountId: string;
    type: AccountType;
    active: number;
    timestampLastLogin: number;
    timestampRegister: number;

    constructor() {
        this.accountId = S.Strings.EMPTY;
        this.type = AccountType.User;
        this.active = S.INT_TRUE;
        this.timestampLastLogin = -1;
        this.timestampRegister = -1;
    }

    isUser(): boolean {
        return this.type === AccountType.User;
    }

    static toJson(entity: AccountEntity): any {
        if (entity === null) {
            return null;
        }

        return {
            'accountId': entity.accountId,
            'type': entity.type,
            'active': entity.active,
            'timestampLastLogin': entity.timestampLastLogin,
            'timestampRegister': entity.timestampRegister,
        }
    }

    static fromJson(json): AccountEntity {
        if (json === null) {
            return null;
        }

        const entity = new AccountEntity();

        entity.accountId = (json.accountId ?? entity.accountId).toString();
        entity.type = parseInt(json.type ?? entity.type);
        entity.active = parseInt(json.active ?? entity.active);
        entity.timestampLastLogin = parseInt(json.timestampLastLogin ?? entity.timestampLastLogin);
        entity.timestampRegister = parseInt(json.timestampRegister ?? entity.timestampRegister);

        return entity;
    }

}
