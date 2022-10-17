import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';
import MiningFarmApi from '../data-sources/MiningFarmApi';

export default class MiningFarmApiRepo implements MiningFarmRepo {

    miningFarmApi: MiningFarmApi;

    constructor() {
        this.miningFarmApi = new MiningFarmApi();
    }

    async fetchAllMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.miningFarmApi.fetchAllMiningFarms();
    }

    async fetchPopularMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.miningFarmApi.fetchPopularMiningFarms();
    }

    async fetchMiningFarmsByIds(miningFarmIds: string[]): Promise < MiningFarmEntity[] > {
        return this.miningFarmApi.fetchMiningFarmsByIds(miningFarmIds);
    }
}
