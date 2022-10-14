import S from '../../../core/utilities/Main';

export default class CudosDataEntity {
    price: number;
    priceChange: number;
    blockReward: string;
    networkDifficulty: string;

    constructor() {
        this.price = S.NOT_EXISTS;
        this.priceChange = S.NOT_EXISTS;
        this.blockReward = S.Strings.EMPTY;
        this.networkDifficulty = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'price': this.price,
        }
    }

    static fromJson(json): CudosDataEntity {
        if (json === null) {
            return null;
        }

        const model = new CudosDataEntity();

        model.price = Number(json.price) ?? model.price;

        return model;
    }

}
