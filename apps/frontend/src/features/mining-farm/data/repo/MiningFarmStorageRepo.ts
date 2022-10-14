import StorageHelper from '../../../../core/helpers/StorageHelper';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';

export default class MiningFarmStorageRepo implements MiningFarmRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }

    getAllFarmgs(callback: (farms: MiningFarmEntity[]) => void) {
        const farms = this.storageHelper.miningFarmsJson.map((json: any) => MiningFarmEntity.fromJson(json));

        callback(farms);
    }

    getFarmById(farmId: string, callback: (farm: MiningFarmEntity) => void) {
        const farmJson = this.storageHelper.miningFarmsJson.find((json: any) => json.id === farmId);

        callback(MiningFarmEntity.fromJson(farmJson));
    }
}
