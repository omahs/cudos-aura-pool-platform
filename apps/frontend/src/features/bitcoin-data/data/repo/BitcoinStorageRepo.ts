import StorageHelper from '../../../../core/helpers/StorageHelper';
import BitcoinDataModel from '../../entities/BitcoinData';
import BitcoinRepo from '../../presentation/repos/BitcoinRepo';

export default class BitcoinStorageRepo implements BitcoinRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }

    getBitcoinData(callback: (bitcoinData: BitcoinDataModel) => void) {
        const bitcoinData = BitcoinDataModel.fromJson(this.storageHelper.bitcoinDataJson);
        callback(bitcoinData);
    }
}
