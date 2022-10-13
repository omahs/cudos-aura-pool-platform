import MiningFarmModel from '../../entities/MiningFarmModel';

export default interface MiningFarmRepo {
    getAllFarmgs(callback: (farms: MiningFarmModel[]) => void);

    getFarmById(farmId: string, callback: (farm: MiningFarmModel) => void);
}
