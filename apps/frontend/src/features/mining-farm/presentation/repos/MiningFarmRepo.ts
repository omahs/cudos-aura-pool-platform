import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';

export default interface MiningFarmRepo {

    fetchAllMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchPopularMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchMiningFarmsByIds(miningFarmIds: string[]): Promise < MiningFarmEntity[] >;
    fetchMiningFarmById(miningFarmId: string): Promise < MiningFarmEntity >;
    fetchMiningFarmByAccountId(accountId: string): Promise < MiningFarmEntity >;
    fetchMiningFarmsByFilter(miningFarmFilterModel: MiningFarmFilterModel): Promise < {miningFarmEntities: MiningFarmEntity[], total: number} >;
    editMiningFarm(miningFarmEntity: MiningFarmEntity): Promise < void >;
}
