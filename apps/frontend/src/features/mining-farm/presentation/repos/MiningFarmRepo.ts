import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';

export default interface MiningFarmRepo {

    fetchAllMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchPopularMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchMiningFarmsByIds(farmids: string[]): Promise < MiningFarmEntity[] >;
    fetchMiningFarmsByFilter(miningFarmFilterModel: MiningFarmFilterModel): Promise < {miningFarmEntities: MiningFarmEntity[], total: number} >;
}
