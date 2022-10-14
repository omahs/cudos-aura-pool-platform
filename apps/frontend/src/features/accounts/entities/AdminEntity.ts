import S from '../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';

export default class AdminEntity {

    accountId: string;

    constructor() {
        this.accountId = S.Strings.NOT_EXISTS;

        makeAutoObservable(this);
    }

    static toJson(model: AdminEntity) {
        return {
            'accountId': model.accountId,
        }
    }

    static fromJson(json: any) {
        if (json === null) {
            return null;
        }

        const model = new AdminEntity();

        model.accountId = (json.accountId ?? model.accountId).toString();

        return model;
    }

}
