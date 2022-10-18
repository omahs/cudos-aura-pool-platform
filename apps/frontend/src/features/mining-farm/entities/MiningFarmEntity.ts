import { makeAutoObservable } from 'mobx';
import S from '../../../core/utilities/Main';

export default class MiningFarmEntity {
    id: string;
    name: string;
    legalName: string;
    primaryAccountOwnerName: string;
    primaryAccountOwnerEmail: string;
    description: string;
    manufacturerIds: string[];
    minerIds: string[];
    energySourceIds: string[];
    hashRateTh: number;
    powerCost: number;
    machinesLocation: string
    poolFee: number;
    powerConsumptionPerTh: number;
    profileImgUrl: string;
    coverImgUrl: string;
    farmPhotoUrls: string[];

    constructor() {
        this.id = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.legalName = S.Strings.EMPTY;
        this.primaryAccountOwnerName = S.Strings.EMPTY;
        this.primaryAccountOwnerEmail = S.Strings.EMPTY;
        this.description = S.Strings.EMPTY;
        this.manufacturerIds = [];
        this.minerIds = [];
        this.energySourceIds = [];
        this.hashRateTh = S.NOT_EXISTS;
        this.powerCost = S.NOT_EXISTS;
        this.machinesLocation = S.Strings.EMPTY;
        this.poolFee = S.NOT_EXISTS;
        this.powerConsumptionPerTh = S.NOT_EXISTS;
        this.profileImgUrl = S.Strings.EMPTY;
        this.coverImgUrl = S.Strings.EMPTY;
        this.farmPhotoUrls = [];

        makeAutoObservable(this);
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
            'legalName': this.legalName,
            'primaryAccountOwnerName': this.primaryAccountOwnerName,
            'primaryAccountOwnerEmail': this.primaryAccountOwnerName,
            'description': this.description,
            'manufacturerIds': this.manufacturerIds,
            'minerIds': this.minerIds,
            'energySourceIds': this.energySourceIds,
            'hashRateTh': this.hashRateTh,
            'powerCost': this.powerCost,
            'machinesLocation': this.machinesLocation,
            'poolFee': this.poolFee,
            'powerConsumptionPerTh': this.powerConsumptionPerTh,
            'profileImgUrl': this.profileImgUrl,
            'coverImgUrl': this.coverImgUrl,
            'farmPhotoUrls': JSON.stringify(this.farmPhotoUrls),
        }
    }

    static fromJson(json): MiningFarmEntity {
        if (json === null) {
            return null;
        }

        const model = new MiningFarmEntity();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.legalName = json.legalName ?? model.legalName;
        model.primaryAccountOwnerName = json.primaryAccountOwnerName ?? model.primaryAccountOwnerName;
        model.primaryAccountOwnerEmail = json.primaryAccountOwnerEmail ?? model.primaryAccountOwnerEmail;
        model.description = json.description ?? model.description;
        model.manufacturerIds = json.manufacturerIds ?? model.manufacturerIds;
        model.minerIds = json.minerIds ?? model.minerIds;
        model.energySourceIds = json.energySourceIds ?? model.energySourceIds;
        model.hashRateTh = Number(json.hashRateTh) ?? model.hashRateTh;
        model.powerCost = Number(json.powerCost) ?? model.powerCost;
        model.machinesLocation = json.machinesLocation ?? model.machinesLocation;
        model.poolFee = Number(json.poolFee) ?? model.poolFee;
        model.powerConsumptionPerTh = Number(json.powerConsumptionPerTh) ?? model.powerConsumptionPerTh;
        model.profileImgUrl = json.profileImgUrl ?? model.profileImgUrl;
        model.coverImgUrl = json.coverImgUrl ?? model.coverImgUrl;
        model.farmPhotoUrls = json.farmPhotoUrls ?? model.farmPhotoUrls;

        return model;
    }

    // TODO: do a good parsing
    parseHashRateFromString(hashRateString: string) {
        const [hashRate, unit] = hashRateString.split(' ');
        const hashRateParsed = Number(hashRate);

        switch (unit.toLowerCase()) {
            case 'eh/s':
                this.hashRateTh = hashRateParsed * 1000000;
                return;
            case 'ph/s':
                this.hashRateTh = hashRateParsed * 1000;
                return;
            case 'th/s':
                this.hashRateTh = hashRateParsed;
                return;
            default:
                this.hashRateTh = S.NOT_EXISTS;
        }
    }

}
