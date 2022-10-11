import StorageHelper from '../../../../core/helpers/StorageHelper';
import CudosRepo from '../../presentation/repos/CudosRepo';

export default class CudosStorageRepo implements CudosRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }

    getCudosPrice(callback: (price: number) => void) {
        callback(0.07);
    }
}
