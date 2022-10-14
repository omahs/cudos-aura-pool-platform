import BitcoinDataEntity from '../../entities/BitcoinDataEntity';
import BitcoinRepo from '../../presentation/repos/BitcoinRepo';
import BitcoinApi from '../data-sources/BitcoinApi';

export default class BitcoinApiRepo implements BitcoinRepo {

    bitcoinApi: BitcoinApi;

    constructor() {
        this.bitcoinApi = new BitcoinApi();
    }

    async fetchBitcoinData(): Promise < BitcoinDataEntity > {
        return this.bitcoinApi.fetchBitcoinData();
    }

}
