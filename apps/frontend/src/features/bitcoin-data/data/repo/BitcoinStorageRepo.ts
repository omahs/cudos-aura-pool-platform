import StorageHelper from '../../../../core/helpers/StorageHelper';
import BitcoinDataEntity from '../../entities/BitcoinDataEntity';
import BitcoinRepo from '../../presentation/repos/BitcoinRepo';

export default class BitcoinStorageRepo implements BitcoinRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchBitcoinData(): Promise < BitcoinDataEntity > {
        return BitcoinDataEntity.fromJson(this.storageHelper.bitcoinDataJson);
    }

}
