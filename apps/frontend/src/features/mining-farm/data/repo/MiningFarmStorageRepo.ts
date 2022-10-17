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

    async fetchPopularMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.storageHelper.miningFarmsJson.slice(0, 3).map((json: any) => MiningFarmEntity.fromJson(json));
    }

    async fetchMiningFarmById(farmId: string): Promise < MiningFarmEntity > {
        const farmJson = this.storageHelper.miningFarmsJson.find((json: any) => json.id === farmId);
        return MiningFarmEntity.fromJson(farmJson);
    }

    async fetchMiningFarmsByIds(farmIds: string[]): Promise < MiningFarmEntity[] > {
        const farmsJson = this.storageHelper.miningFarmsJson.filter((json: any) => farmIds.includes(json.id));
        return farmsJson.map((farmJson) => MiningFarmEntity.fromJson(farmJson));
    }
}
