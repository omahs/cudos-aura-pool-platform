import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';

export default class MiningFarmApi implements MiningFarmRepo {

    async fetchAllMiningFarms(): Promise < MiningFarmEntity[] > {
        return null;
    }

    async fetchMiningFarmById(farmId: string): Promise < MiningFarmEntity > {
        return null;
    }

    async fetchMiningFarmsByIds(miningFarmIds: string[]): Promise < MiningFarmEntity[] > {
        return null;
    }
}
