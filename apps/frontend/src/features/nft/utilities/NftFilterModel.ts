import { makeAutoObservable } from 'mobx';
import S from '../../../core/utilities/Main';

export default class NftFilterModel {

    static SORT_KEY_NAME = 1;
    static SORT_KEY_PRICE = 2;

    sessionAccount: number;
    categoryIds: string[];
    sortKey: number;
    searchString: string;
    from: number;
    count: number;

    constructor() {
        this.sessionAccount = S.INT_FALSE;
        this.sortKey = NftFilterModel.SORT_KEY_NAME;
        this.searchString = '';
        this.categoryIds = ['0'];
        this.from = -1;
        this.count = -1;

        makeAutoObservable(this);
    }

    static toJson(model) {
        if (model === null) {
            return null;
        }

        return {
            sessionAccount: model.sessionAccount,
            sortKey: model.sortKey,
            searchString: model.searchString,
            categoryIds: model.categoryIds,
            from: model.from,
            count: model.count,
        }
    }

    static fromJson(json): NftFilterModel {
        if (json === null) {
            return null;
        }

        const model = new NftFilterModel();

        model.sessionAccount = parseInt(json.sessionAccount ?? model.sessionAccount);
        model.sortKey = parseInt(json.sortKey ?? model.sortKey);
        model.searchString = json.searchString ?? model.searchString;
        model.categoryIds = (json.categoryIds ?? model.categoryIds).map((j) => j.toString());
        model.from = parseInt(json.from ?? model.from);
        model.count = parseInt(json.count ?? model.count);

        return model;
    }

}
