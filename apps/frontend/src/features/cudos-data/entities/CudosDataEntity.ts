import S from '../../../core/utilities/Main';

export default class CudosDataEntity {

    price: number;
    priceChange: number;

    constructor() {
        this.price = S.NOT_EXISTS;
        this.priceChange = S.NOT_EXISTS;
    }

    toJson(): any {
        return {
            'price': this.price,
            'priceChange': this.priceChange,
        }
    }

    static fromJson(json): CudosDataEntity {
        if (json === null) {
            return null;
        }

        const model = new CudosDataEntity();

        model.price = Number(json.price ?? model.price);
        model.priceChange = Number(json.priceChange ?? model.priceChange);

        return model;
    }

}
