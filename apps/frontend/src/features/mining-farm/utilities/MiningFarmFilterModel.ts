import S from '../../../core/utilities/Main';

export default class MiningFarmFilterModel {

    static SORT_KEY_NAME = 1;
    static SORT_KEY_POPULAR = 2;

    sortKey: number;
    searchString: string;
    from: number;
    count: number;

    constructor() {
        this.sortKey = MiningFarmFilterModel.SORT_KEY_NAME;
        this.searchString = '';
        this.from = -1;
        this.count = -1;
    }

    static toJson(model) {
        if (model === null) {
            return null;
        }

        return {
            sortKey: model.sortKey,
            searchString: model.searchString,
            from: model.from,
            count: model.count,
        }
    }

    static fromJson(json): MiningFarmFilterModel {
        if (json === null) {
            return null;
        }

        const model = new MiningFarmFilterModel();

        model.sortKey = parseInt(json.sortKey ?? model.sortKey);
        model.searchString = json.searchString ?? model.searchString;
        model.from = parseInt(json.from ?? model.from);
        model.count = parseInt(json.count ?? model.count);

        return model;
    }

}
