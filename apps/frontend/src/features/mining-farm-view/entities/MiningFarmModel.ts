import S from '../../../core/utilities/Main';

export default class MiningFarmModel {
    id: string;
    name: string;
    description: string;
    powerCost: number;
    poolFee: number;
    powerConsumptionPerTh: number;
    profileImgurl: string;
    coverImgUrl: string;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.description = S.Strings.EMPTY;
        this.powerCost = S.NOT_EXISTS;
        this.poolFee = S.NOT_EXISTS;
        this.powerConsumptionPerTh = S.NOT_EXISTS;
        this.profileImgurl = S.Strings.EMPTY;
        this.coverImgUrl = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
            'description': this.description,
            'powerCost': this.powerCost,
            'poolFee': this.poolFee,
            'powerConsumptionPerTh': this.powerConsumptionPerTh,
            'profileImgurl': this.profileImgurl,
            'coverImgUrl': this.coverImgUrl,
        }
    }

    static fromJson(json): MiningFarmModel {
        if (json === null) {
            return null;
        }

        const model = new MiningFarmModel();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.description = json.description ?? model.description;
        model.powerCost = json.powerCost ?? model.powerCost;
        model.poolFee = Number(json.poolFee) ?? model.poolFee;
        model.powerConsumptionPerTh = Number(json.powerConsumptionPerTh) ?? model.powerConsumptionPerTh;
        model.profileImgurl = json.profileImgurl ?? model.profileImgurl;
        model.coverImgUrl = json.coverImgUrl ?? model.coverImgUrl;

        return model;
    }

}
