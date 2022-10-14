import StorageHelper from '../../../../core/helpers/StorageHelper';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';

export default class MiningFarmStorageRepo implements MiningFarmRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchAllMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.storageHelper.miningFarmsJson.map((json: any) => MiningFarmEntity.fromJson(json));
    }

    async fetchMiningFarmById(farmId: string): Promise < MiningFarmEntity > {
        const farmJson = this.storageHelper.miningFarmsJson.find((json: any) => json.id === farmId);
        return MiningFarmEntity.fromJson(farmJson);
    }

}
