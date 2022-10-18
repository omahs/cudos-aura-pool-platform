import S from '../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';

export default class SuperAdminEntity {

    accountId: string;

    constructor() {
        this.accountId = S.Strings.NOT_EXISTS;

        makeAutoObservable(this);
    }

    static toJson(model: SuperAdminEntity) {
        return {
            'accountId': model.accountId,
        }
    }

    static fromJson(json: any) {
        if (json === null) {
            return null;
        }

        const model = new SuperAdminEntity();

        model.accountId = (json.accountId ?? model.accountId).toString();

        return model;
    }

}
