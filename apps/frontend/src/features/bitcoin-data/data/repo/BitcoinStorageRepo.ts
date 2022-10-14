import StorageHelper from '../../../../core/helpers/StorageHelper';
import BitcoinDataEntity from '../../entities/BitcoinDataEntity';
import BitcoinRepo from '../../presentation/repos/BitcoinRepo';

export default class BitcoinStorageRepo implements BitcoinRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }

    getBitcoinData(callback: (bitcoinData: BitcoinDataEntity) => void) {
        const bitcoinData = BitcoinDataEntity.fromJson(this.storageHelper.bitcoinDataJson);
        callback(bitcoinData);
    }
}
