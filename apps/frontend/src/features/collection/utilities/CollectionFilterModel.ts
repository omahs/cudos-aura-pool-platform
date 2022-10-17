import { makeAutoObservable } from 'mobx';
import S from '../../../core/utilities/Main';

export default class CollectionFilterModel {

    static SORT_KEY_NAME = 1;
    static SORT_KEY_PRICE = 2;

    sessionAccount: number;
    farmId: string;
    sortKey: number;
    searchString: string;
    from: number;
    count: number;
    categoryIds: string[];

    constructor() {
        this.sessionAccount = S.INT_FALSE;
        this.farmId = '';
        this.sortKey = CollectionFilterModel.SORT_KEY_NAME;
        this.searchString = '';
        this.from = -1;
        this.count = -1;
        this.categoryIds = ['0'];

        makeAutoObservable(this);
    }

    static toJson(model) {
        if (model === null) {
            return null;
        }

        return {
            sessionAccount: model.sessionAccount,
            farmId: model.farmId,
            sortKey: model.sortKey,
            searchString: model.searchString,
            from: model.from,
            count: model.count,
            categoryIds: model.categoryIds,
        }
    }

    static fromJson(json): CollectionFilterModel {
        if (json === null) {
            return null;
        }

        const model = new CollectionFilterModel();

        model.sessionAccount = parseInt(json.sessionAccount ?? model.sessionAccount);
        model.farmId = (json.farmId ?? model.farmId).toString();
        model.sortKey = parseInt(json.sortKey ?? model.sortKey);
        model.searchString = json.searchString ?? model.searchString;
        model.from = parseInt(json.from ?? model.from);
        model.count = parseInt(json.count ?? model.count);
        model.categoryIds = (json.categoryIds ?? model.categoryIds).map((j) => j.toString());

        return model;
    }

}
