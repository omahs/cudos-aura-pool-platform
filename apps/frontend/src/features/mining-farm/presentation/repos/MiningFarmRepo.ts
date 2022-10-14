import MiningFarmEntity from '../../entities/MiningFarmEntity';

export default interface MiningFarmRepo {

    fetchAllMiningFarms(): Promise < MiningFarmEntity[] >;
    fetchMiningFarmById(farmId: string): Promise < MiningFarmEntity >;

}
