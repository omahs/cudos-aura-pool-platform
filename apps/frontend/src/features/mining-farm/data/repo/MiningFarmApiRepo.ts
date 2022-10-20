import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';
import MiningFarmApi from '../data-sources/MiningFarmApi';

export default class MiningFarmApiRepo implements MiningFarmRepo {

    miningFarmApi: MiningFarmApi;

    constructor() {
        this.miningFarmApi = new MiningFarmApi();
    }

    async fetchAllMiningFarms(): Promise < MiningFarmEntity[] > {
        const miningFarmFilterModel = new MiningFarmFilterModel();
        miningFarmFilterModel.from = 0;
        miningFarmFilterModel.count = Number.MAX_SAFE_INTEGER;

        const { miningFarmEntities, total } = await this.miningFarmApi.fetchMiningFarmsByFilter(miningFarmFilterModel);
        return miningFarmEntities;
    }

    async fetchPopularMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.miningFarmApi.fetchPopularMiningFarms();
    }

    async fetchMiningFarmsByIds(miningFarmIds: string[]): Promise < MiningFarmEntity[] > {
        return this.miningFarmApi.fetchMiningFarmsByIds(miningFarmIds);
    }

    async fetchMiningFarmById(miningFarmId: string): Promise < MiningFarmEntity > {
        const miningFarmEntities = await this.fetchMiningFarmsByIds([miningFarmId]);
        return miningFarmEntities.length === 1 ? miningFarmEntities[0] : null;
    }

    async fetchMiningFarmsByFilter(miningFarmFilterModel: MiningFarmFilterModel): Promise < {miningFarmEntities: MiningFarmEntity[], total: number} > {
        return this.miningFarmApi.fetchMiningFarmsByFilter(miningFarmFilterModel);
    }

    async editMiningFarm(miningFarmEntity: MiningFarmEntity): Promise < void > {
        return this.miningFarmApi.editMiningFarm(miningFarmEntity);
    }

    async approveFarms(miningFarmIds: string[]): Promise < void > {
        return this.miningFarmApi.approveFarms(miningFarmIds);
    }

}
