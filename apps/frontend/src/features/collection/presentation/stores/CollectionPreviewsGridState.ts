import GridViewState from '../../../../core/presentation/stores/GridViewState';
import { makeAutoObservable, runInAction } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';

export default class CollectionPreviewsGridState {

    fetchCollections: () => Promise < {collectionEntities: CollectionEntity[], total: number }>;
    fetchMiningFarms: (farmIds: string[]) => Promise < MiningFarmEntity[] >;
    gridViewState: GridViewState;

    collectionEntities: CollectionEntity[];
    miningFarmEntitiesMap: Map < string, MiningFarmEntity >;

    constructor(
        fetchCollections: () => Promise < {collectionEntities: CollectionEntity[], total: number }>,
        fetchMiningFarms: (farmIds: string[]) => Promise < MiningFarmEntity[] >,
    ) {
        this.fetchCollections = fetchCollections;
        this.fetchMiningFarms = fetchMiningFarms;
        this.gridViewState = new GridViewState(this.fetchViewingModels, 3, 4, 6);

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults() {
        this.gridViewState.resetDefaults()
        this.collectionEntities = [];
    }

    fetchViewingModels = async () => {
        this.gridViewState.setIsLoading(true);
        const { collectionEntities, total } = await this.fetchCollections();
        const miningFarmEntities = await this.fetchMiningFarms(collectionEntities.map((collectionEntity) => {
            return collectionEntity.farmId;
        }));

        const miningFarmEntitiesMap = new Map();
        miningFarmEntities.forEach((miningFarmEntity) => {
            miningFarmEntitiesMap.set(miningFarmEntity.id, miningFarmEntity);
        });

        runInAction(() => {
            this.miningFarmEntitiesMap = miningFarmEntitiesMap;
            this.collectionEntities = collectionEntities;
            this.gridViewState.setTotalItems(total);
            this.gridViewState.setIsLoading(false);
        });
    }
}
