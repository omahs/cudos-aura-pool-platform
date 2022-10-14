import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class NftPreviewEntity {
    id: string;
    name: string;
    category: string;
    collectionName: string;
    hashPower: number;
    price: BigNumber;
    imageUrl: string;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.collectionName = S.Strings.EMPTY;
        this.hashPower = S.NOT_EXISTS;
        this.price = new BigNumber(S.NOT_EXISTS);
        this.imageUrl = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
            'category': this.category,
            'collectionName': this.collectionName,
            'hashPower': this.hashPower,
            'price': this.price,
            'imageUrl': this.imageUrl,
        }
    }

    static fromJson(json): NftPreviewEntity {
        if (json === null) {
            return null;
        }

        const model = new NftPreviewEntity();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.category = json.category ?? model.category;
        model.collectionName = json.collectionName ?? model.collectionName;
        model.hashPower = Number(json.hashPower) ?? model.hashPower;
        model.price = new BigNumber(json.price) ?? model.price;
        model.imageUrl = json.imageUrl ?? model.imageUrl;

        return model;
    }

}
