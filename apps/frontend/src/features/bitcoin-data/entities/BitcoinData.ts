import S from '../../../core/utilities/Main';

export default class BitcoinDataModel {
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
            'priceChange': this.priceChange,
            'blockReward': this.blockReward,
            'networkDifficulty': this.networkDifficulty,
        }
    }

    static fromJson(json): BitcoinDataModel {
        if (json === null) {
            return null;
        }

        const model = new BitcoinDataModel();

        model.price = Number(json.price) ?? model.price;
        model.priceChange = Number(json.priceChange) ?? model.priceChange;
        model.blockReward = json.blockReward ?? model.blockReward;
        model.networkDifficulty = json.networkDifficulty ?? model.networkDifficulty;

        return model;
    }

}
