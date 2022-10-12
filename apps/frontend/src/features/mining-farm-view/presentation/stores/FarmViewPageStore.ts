import { makeAutoObservable } from 'mobx';
import MiningFarmModel from '../../entities/MiningFarmModel';
import MiningFarmRepo from '../repos/MiningFarmRepo';

export default class FarmViewPageStore {
    farmRepo: MiningFarmRepo;

    farmProfile: MiningFarmModel;

    constructor(farmRepo: MiningFarmRepo) {
        this.farmRepo = farmRepo;

        this.farmProfile = null;

        makeAutoObservable(this);
    }

    innitiate(farmId: string, callback: () => void) {
        this.farmRepo.getFarmById(farmId, (farmProfile) => {
            this.farmProfile = farmProfile;
        });

        callback();
    }
}
