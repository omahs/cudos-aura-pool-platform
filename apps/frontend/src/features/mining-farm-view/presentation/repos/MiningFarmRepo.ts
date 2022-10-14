import MiningFarmEntity from '../../entities/MiningFarmEntity';

export default interface MiningFarmRepo {
    getAllFarmgs(callback: (farms: MiningFarmEntity[]) => void);

    getFarmById(farmId: string, callback: (farm: MiningFarmEntity) => void);
}
