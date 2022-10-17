import S from '../../../core/utilities/Main';

export enum AccountType {
    User = 1,
    Admin = 2,
    SuperAdmin = 3,
}

export default class AccountEntity {

    accountId: string;
    type: AccountType;

    constructor() {
        this.accountId = S.Strings.EMPTY;
        this.type = AccountType.User;
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
        }
    }

    static fromJson(json): AccountEntity {
        if (json === null) {
            return null;
        }

        const entity = new AccountEntity();

        entity.accountId = (json.accountId ?? entity.accountId).toString();
        entity.type = parseInt(json.type ?? entity.type);

        return entity;
    }

}
