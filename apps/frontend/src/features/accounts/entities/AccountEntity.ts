import S from '../../../core/utilities/Main';

enum AccountType {
    User = 1,
    Admin = 2,
    SuperAdmin = 3,
}

export default class AccountEntity {

    id: string;
    type: AccountType;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.type = AccountType.User;
    }

    toJson(): any {
        return {
            'id': this.id,
            'type': this.type,
        }
    }

    static fromJson(json): AccountEntity {
        if (json === null) {
            return null;
        }

        const entity = new AccountEntity();

        entity.id = (json.id ?? entity.id).toString();
        entity.type = parseInt(json.type ?? entity.type);

        return entity;
    }

}
