import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class CollectionPreviewEntity {
    id: string;
    name: string;
    hashPower: number;
    price: BigNumber;
    profileImgurl: string;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.hashPower = S.NOT_EXISTS;
        this.price = new BigNumber(S.NOT_EXISTS);
        this.profileImgurl = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
            'hashPower': this.hashPower,
            'price': this.price,
            'profileImgurl': this.profileImgurl,
        }
    }

    static fromJson(json): CollectionPreviewEntity {
        if (json === null) {
            return null;
        }

        const model = new CollectionPreviewEntity();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.hashPower = Number(json.hashPower) ?? model.hashPower;
        model.price = new BigNumber(json.price) ?? model.price;
        model.profileImgurl = json.profileImgurl ?? model.profileImgurl;

        return model;
    }

    hashRateDisplay(): string {
        // TODO: calculate EH or TH or w/e

        return `${this.hashPower} EH/s`
    }

    priceDisplay(): string {
        // TODO: calculate K or M or w/e

        return `${this.price.toFixed(2)}K CUDOS`
    }

    priceUsdDisplay(cudosInUsd: number) {
        // TODO calculate M or B or w/e

        return `$${this.price.multipliedBy(cudosInUsd).toFixed(1)}K`
    }
}
