import StorageHelper from '../../../../core/helpers/StorageHelper';
import MiningFarmModel from '../../entities/MiningFarmModel';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';

export default class MiningFarmStorageRepo implements MiningFarmRepo {
    storageHelper: StorageHelper;

    constructor() {
        this.storageHelper = new StorageHelper();
    }

    getAllFarmgs(callback: (farms: MiningFarmModel[]) => void) {
        const farms = this.storageHelper.miningFarmsJson.map((json: any) => MiningFarmModel.fromJson(json));

        callback(farms);
    }

    getFarmById(farmId: string, callback: (farm: MiningFarmModel) => void) {
        const farmJson = this.storageHelper.miningFarmsJson.find((json: any) => json.id === farmId);

        callback(MiningFarmModel.fromJson(farmJson));
    }
}
