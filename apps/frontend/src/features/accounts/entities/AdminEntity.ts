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

    static toJson(model: AdminEntity) {
        return {
            'accountId': model.accountId,
            'email': model.email,
        }
    }

    static fromJson(json: any) {
        if (json === null) {
            return null;
        }

        const model = new AdminEntity();

        model.accountId = (json.accountId ?? model.accountId).toString();
        model.email = json.email ?? model.email;

        return model;
    }

}
