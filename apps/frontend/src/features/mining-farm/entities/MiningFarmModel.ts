import S from '../../../core/utilities/Main';

export default class MiningFarmModel {
    id: string;
    name: string;
    powerCost: number;
    poolFee: number;
    powerConsumptionPerTh: number;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.powerCost = S.NOT_EXISTS;
        this.poolFee = S.NOT_EXISTS;
        this.powerConsumptionPerTh = S.NOT_EXISTS;
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
            'powerCost': this.powerCost,
            'poolFee': this.poolFee,
            'powerConsumptionPerTh': this.powerConsumptionPerTh,
        }
    }

    static fromJson(json): MiningFarmModel {
        if (json === null) {
            return null;
        }

        const model = new MiningFarmModel();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.powerCost = json.powerCost ?? model.powerCost;
        model.poolFee = Number(json.poolFee) ?? model.poolFee;
        model.powerConsumptionPerTh = Number(json.powerConsumptionPerTh) ?? model.powerConsumptionPerTh;

        return model;
    }

}
