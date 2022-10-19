import S from '../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';

export default class AdminEntity {

    accountId: string;
    email: string;

    constructor() {
        this.accountId = S.Strings.NOT_EXISTS;
        this.email = S.Strings.EMPTY;

        makeAutoObservable(this);
    }

    static toJson(entity: AdminEntity) {
        if (entity === null) {
            return null;
        }

        return {
            'accountId': entity.accountId,
            'email': entity.email,
        }
    }

    static fromJson(json: any) {
        if (json === null) {
            return null;
        }

        const entity = new AdminEntity();

        entity.accountId = (json.accountId ?? entity.accountId).toString();
        entity.email = json.email ?? entity.email;

        return entity;
    }

}
