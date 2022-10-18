import { makeAutoObservable, runInAction } from 'mobx';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../repos/MiningFarmRepo';
import CollectionFilterModel from '../../../collection/utilities/CollectionFilterModel';
import GridViewState from '../../../../core/presentation/stores/GridViewState';

export default class FarmViewPageStore {

    miningFarmRepo: MiningFarmRepo;
    collectionRepo: CollectionRepo;

    gridViewState: GridViewState;
    collectionFilterModel: CollectionFilterModel;

    miningFarmEntity: MiningFarmEntity;
    collectionEntities: CollectionEntity[];
    miningFarmEntitiesMap: Map < string, MiningFarmEntity >;

    constructor(miningFarmRepo: MiningFarmRepo, collectionRepo: CollectionRepo) {
        this.miningFarmRepo = miningFarmRepo;
        this.collectionRepo = collectionRepo;

        this.gridViewState = new GridViewState(this.fetch, 3, 4, 6);
        this.collectionFilterModel = new CollectionFilterModel();

        this.miningFarmEntity = null;
        this.collectionEntities = null;
        this.miningFarmEntitiesMap = null;

        makeAutoObservable(this);
    }

    async init(farmId: string) {
        this.miningFarmEntity = await this.miningFarmRepo.fetchMiningFarmById(farmId);
        this.collectionFilterModel.farmId = this.miningFarmEntity.id;
        await this.fetch();
    }

    fetch = async () => {
        this.gridViewState.setIsLoading(true);

        this.collectionFilterModel.from = this.gridViewState.getFrom();
        this.collectionFilterModel.count = this.gridViewState.getItemsPerPage();

        const { collectionEntities, total } = await this.collectionRepo.fetchCollectionsByFilter(this.collectionFilterModel);
        const miningFarmEntities = await this.miningFarmRepo.fetchMiningFarmsByIds(collectionEntities.map((collectionEntity) => {
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

    getMiningFarmName(miningFarmId: string): string {
        return this.miningFarmEntitiesMap.get(miningFarmId)?.name ?? '';
    }

    onChangeSortKey = (sortKey: number) => {
        this.collectionFilterModel.sortKey = sortKey;
        this.fetch();
    }

}
