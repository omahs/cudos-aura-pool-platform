import S from '../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';

export default class AdminEntity {

    adminId: string;
    accountId: string;
    email: string;
    fullname: string;

    constructor() {
        this.adminId = S.Strings.NOT_EXISTS;
        this.accountId = S.Strings.NOT_EXISTS;
        this.email = S.Strings.EMPTY;
        this.fullname = S.Strings.EMPTY;

        makeAutoObservable(this);
    }

    static toJson(entity: AdminEntity) {
        if (entity === null) {
            return null;
        }

        return {
            'adminId': entity.adminId,
            'accountId': entity.accountId,
            'email': entity.email,
            'fullname': entity.fullname,
        }
    }

    static fromJson(json: any) {
        if (json === null) {
            return null;
        }

        const entity = new AdminEntity();

        entity.adminId = (json.adminId ?? entity.adminId).toString();
        entity.accountId = (json.accountId ?? entity.accountId).toString();
        entity.email = json.email ?? entity.email;
        entity.fullname = json.fullname ?? entity.fullname;

        return entity;
    }

}
