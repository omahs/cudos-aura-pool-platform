import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../repos/MiningFarmRepo';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';
import MiningFarmPreviewsGridState from './MiningFarmPreviewsGridState';

export default class ExploreMiningFarmsPageState {

    miningFarmRepo: MiningFarmRepo;

    miningFarmFilterModel: MiningFarmFilterModel;
    miningFarmPreviewsGridState: MiningFarmPreviewsGridState;

    constructor(miningFarmRepo: MiningFarmRepo) {
        this.miningFarmRepo = miningFarmRepo;

        this.miningFarmFilterModel = new MiningFarmFilterModel();
        this.miningFarmPreviewsGridState = new MiningFarmPreviewsGridState(this.fetchMiningFarms);

        makeAutoObservable(this);
    }

    async init() {
        await this.miningFarmPreviewsGridState.fetchViewingModels();
    }

    fetchMiningFarms = async (): Promise < {miningFarmEntities: MiningFarmEntity[], total: number} > => {
        this.miningFarmFilterModel.from = this.miningFarmPreviewsGridState.gridViewState.getFrom();
        this.miningFarmFilterModel.count = this.miningFarmPreviewsGridState.gridViewState.getItemsPerPage();
        return this.miningFarmRepo.fetchMiningFarmsByFilter(this.miningFarmFilterModel);
    }

    getSearchString(): string {
        return this.miningFarmFilterModel.searchString
    }

    setSearchString = (string) => {
        console.log(string)
        this.miningFarmFilterModel.searchString = string;
    }
}
