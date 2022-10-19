import { makeAutoObservable } from 'mobx';
import S from '../../../core/utilities/Main';

export default class NftFilterModel {

    static SORT_KEY_NAME = 1;
    static SORT_KEY_PRICE = 2;

    sessionAccount: number;
    categoryIds: string[];
    sortKey: number;
    searchString: string;
    collectionId: string;
    from: number;
    count: number;

    constructor() {
        this.sessionAccount = S.INT_FALSE;
        this.sortKey = NftFilterModel.SORT_KEY_NAME;
        this.searchString = '';
        this.categoryIds = [];
        this.collectionId = '';
        this.from = 0;
        this.count = Number.MAX_SAFE_INTEGER;

        makeAutoObservable(this);
    }

    static toJson(entity: NftFilterModel) {
        if (entity === null) {
            return null;
        }

        return {
            sessionAccount: entity.sessionAccount,
            sortKey: entity.sortKey,
            searchString: entity.searchString,
            categoryIds: entity.categoryIds,
            collectionId: entity.collectionId,
            from: entity.from,
            count: entity.count,
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
        model.collectionId = (json.collectionId ?? model.collectionId).toString();
        model.from = parseInt(json.from ?? model.from);
        model.count = parseInt(json.count ?? model.count);

        return model;
    }

}
