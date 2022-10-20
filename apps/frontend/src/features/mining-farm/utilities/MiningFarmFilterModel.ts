import { MiningFarmStatus } from '../entities/MiningFarmEntity';

export enum MiningFarmHashPowerFilter {
    NONE = 1,
    BELOW_1000_EH = 2,
    BELOW_2000_EH = 3,
    ABOVE_2000_EH = 4,
}

export enum MiningFarmPriceSortDirection {
    NONE = 1,
    LOW_TO_HIGH = 2,
    HIGH_TO_LOW = 3,
}

export default class MiningFarmFilterModel {

    static SORT_KEY_NAME = 1;
    static SORT_KEY_POPULAR = 2;

    sortKey: number;
    hashPowerFilter: MiningFarmHashPowerFilter;
    sortPriceDirection: MiningFarmPriceSortDirection;
    searchString: string;
    from: number;
    count: number;
    status: MiningFarmStatus;

    constructor() {
        this.sortKey = MiningFarmFilterModel.SORT_KEY_NAME;
        this.hashPowerFilter = MiningFarmHashPowerFilter.NONE;
        this.sortPriceDirection = MiningFarmPriceSortDirection.NONE;
        this.searchString = '';
        this.from = 0;
        this.count = Number.MAX_SAFE_INTEGER;
        this.status = MiningFarmStatus.APPROVED;
    }

    static toJson(model) {
        if (model === null) {
            return null;
        }

        return {
            sortKey: model.sortKey,
            hashPowerFilter: model.hashPowerFilter,
            sortPriceDirection: model.sortPriceDirection,
            searchString: model.searchString,
            from: model.from,
            count: model.count,
            status: model.status,
        }
    }

    static fromJson(json): MiningFarmFilterModel {
        if (json === null) {
            return null;
        }

        const model = new MiningFarmFilterModel();

        model.sortKey = parseInt(json.sortKey ?? model.sortKey);
        model.hashPowerFilter = parseInt(json.hashPowerFilter ?? model.hashPowerFilter);
        model.sortPriceDirection = parseInt(json.sortPriceDirection ?? model.sortPriceDirection);
        model.searchString = json.searchString ?? model.searchString;
        model.from = parseInt(json.from ?? model.from);
        model.count = parseInt(json.count ?? model.count);
        model.status = parseInt(json.status ?? model.status);

        return model;
    }

}
