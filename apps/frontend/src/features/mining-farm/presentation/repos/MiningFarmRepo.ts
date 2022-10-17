import MiningFarmEntity from '../../entities/MiningFarmEntity';

export default interface MiningFarmRepo {

    fetchAllMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchPopularMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchMiningFarmById(farmId: string): Promise < MiningFarmEntity >;
    fetchMiningFarmsByIds(farmids: string[]): Promise < MiningFarmEntity[] >;
}
