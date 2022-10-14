import BitcoinDataEntity from '../../entities/BitcoinDataEntity';
import BitcoinRepo from '../repos/BitcoinRepo';

export default class BitcoinStore {

    bitcoinRepo: BitcoinRepo;

    inited: boolean;
    bitcointDataEntity: BitcoinDataEntity;

    constructor(bitcoinRepo: BitcoinRepo) {
        this.bitcoinRepo = bitcoinRepo;

        this.inited = false;
        this.bitcointDataEntity = null;
    }

    async init() {
        if (this.inited === true) {
            return;
        }

        this.inited = true;
        this.bitcointDataEntity = await this.bitcoinRepo.fetchBitcoinData();
    }

    getBitcoinPrice(): number {
        return this.bitcointDataEntity?.price ?? 0;
    }

    getBitcoinPriceChange(): number {
        return this.bitcointDataEntity?.priceChange ?? 0;
    }

    getNetworkDifficulty(): string {
        return this.bitcointDataEntity?.networkDifficulty ?? '';
    }

    getBlockReward(): string {
        return this.bitcointDataEntity?.blockReward ?? '';
    }

}
