import S from '../../../core/utilities/Main';

enum MinerId {
    ANTMINER = '1',
    WHATSMINER = '2'
}

export default class MinerEntity {
    id: string;
    name: string;

    constructor() {
        this.id = S.Strings.NOT_EXISTS;
        this.name = S.Strings.EMPTY;
    }

    static newInstance(minerId: MinerId): MinerEntity {
        const miner = new MinerEntity();

        miner.id = minerId;
        miner.name = MinerEntity.getMinerName(minerId);

        return miner;
    }

    static getAllMiners(): MinerEntity[] {
        const miners = [];

        miners.push(MinerEntity.newInstance(MinerId.ANTMINER));
        miners.push(MinerEntity.newInstance(MinerId.WHATSMINER));

        return miners;
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
        }
    }

    static fromJson(json): MinerEntity {
        if (json === null) {
            return null;
        }

        const model = new MinerEntity();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;

        return model;
    }

    static getMinerName(minerId: MinerId): string {
        switch (minerId) {
            case MinerId.ANTMINER:
                return 'Antminer S9K 14TH/s';
            case MinerId.WHATSMINER:
                return 'Whatsminer M30S++';
            default:
                return S.Strings.EMPTY;
        }
    }
}
