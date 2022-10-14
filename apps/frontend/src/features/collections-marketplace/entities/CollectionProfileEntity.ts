import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class CollectionProfileEntity {
    id: string;
    farmName: string;
    name: string;
    description: string;
    ownerAddress: string;
    hashPower: number;
    price: BigNumber;
    volume: BigNumber;
    items: number;
    owners: number;
    profileImgurl: string;
    coverImgUrl: string;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.farmName = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.description = S.Strings.EMPTY;
        this.ownerAddress = S.Strings.EMPTY;
        this.hashPower = S.NOT_EXISTS;
        this.price = new BigNumber(S.NOT_EXISTS);
        this.volume = new BigNumber(S.NOT_EXISTS);
        this.items = S.NOT_EXISTS;
        this.owners = S.NOT_EXISTS;
        this.profileImgurl = S.Strings.EMPTY;
        this.coverImgUrl = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'id': this.id,
            'farmName': this.farmName,
            'name': this.name,
            'description': this.description,
            'ownerAddress': this.description,
            'hashPower': this.hashPower,
            'price': this.price,
            'volume': this.volume,
            'items': this.volume,
            'owners': this.volume,
            'profileImgurl': this.profileImgurl,
            'coverImgUrl': this.coverImgUrl,
        }
    }

    static fromJson(json): CollectionProfileEntity {
        if (json === null) {
            return null;
        }

        const model = new CollectionProfileEntity();

        model.id = json.id ?? model.id;
        model.farmName = json.farmName ?? model.farmName;
        model.name = json.name ?? model.name;
        model.description = json.description ?? model.description;
        model.ownerAddress = json.ownerAddress ?? model.ownerAddress;
        model.hashPower = Number(json.hashPower) ?? model.hashPower;
        model.price = new BigNumber(json.price) ?? model.price;
        model.volume = new BigNumber(json.volume) ?? model.volume;
        model.items = Number(json.items) ?? model.items;
        model.owners = Number(json.owners) ?? model.owners;

        model.profileImgurl = json.profileImgurl ?? model.profileImgurl;
        model.coverImgUrl = json.coverImgUrl ?? model.coverImgUrl;

        return model;
    }

    hashRateDisplay(): string {
        // TODO: calculate EH or TH or w/e

        return `${this.hashPower} EH/s`
    }

    priceDisplay(): string {
        // TODO: calculate K or M or w/e

        return `${this.price.toFixed(0)}K CUDOS`
    }
}
