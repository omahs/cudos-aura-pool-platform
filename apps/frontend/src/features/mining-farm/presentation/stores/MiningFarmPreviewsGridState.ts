import GridViewState from '../../../../core/presentation/stores/GridViewState';
import { makeAutoObservable, runInAction } from 'mobx';
import MiningFarmEntity from '../../entities/MiningFarmEntity';

export default class MiningFarmPreviewsGridState {

    fetchMiningFarms: () => Promise < {miningFarmEntities: MiningFarmEntity[], total: number } >;
    gridViewState: GridViewState;

    miningFarmEntities: MiningFarmEntity[];

    constructor(
        fetchMiningFarms: () => Promise < {miningFarmEntities: MiningFarmEntity[], total: number } >,
    ) {
        this.fetchMiningFarms = fetchMiningFarms;
        this.gridViewState = new GridViewState(this.fetchViewingModels, 3, 4, 6);

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults() {
        this.gridViewState.resetDefaults()
        this.miningFarmEntities = [];
    }

    fetchViewingModels = async () => {
        this.gridViewState.setIsLoading(true);

        const { miningFarmEntities, total } = await this.fetchMiningFarms();

        runInAction(() => {
            this.miningFarmEntities = miningFarmEntities;
            this.gridViewState.setTotalItems(total);
            this.gridViewState.setIsLoading(false);
        });
    }
}
