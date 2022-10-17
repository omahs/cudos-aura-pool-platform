import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../repos/MiningFarmRepo';
import CollectionPreviewsGridState from '../../../collection/presentation/stores/CollectionPreviewsGridState';
import CollectionFilterModel from '../../../collection/utilities/CollectionFilterModel';

export default class FarmViewPageStore {

    miningFarmRepo: MiningFarmRepo;
    collectionRepo: CollectionRepo;

    collectionFilterModel: CollectionFilterModel;
    collectionPreviewsGridState: CollectionPreviewsGridState;

    miningFarmEntity: MiningFarmEntity;

    constructor(miningFarmRepo: MiningFarmRepo, collectionRepo: CollectionRepo) {
        this.miningFarmRepo = miningFarmRepo;
        this.collectionRepo = collectionRepo;

        this.collectionFilterModel = new CollectionFilterModel();
        this.collectionPreviewsGridState = new CollectionPreviewsGridState(this.fetchCollections, this.fetchMiningFarms);

        this.miningFarmEntity = null;

        makeAutoObservable(this);
    }

    async init(farmId: string) {
        this.miningFarmEntity = (await this.miningFarmRepo.fetchMiningFarmsByIds([farmId]))[0];
        this.collectionFilterModel.farmId = this.miningFarmEntity.id;
        await this.collectionPreviewsGridState.fetchViewingModels();
    }

    fetchCollections = async (): Promise < {collectionEntities: CollectionEntity[], total: number} > => {
        this.collectionFilterModel.from = this.collectionPreviewsGridState.gridViewState.getFrom();
        this.collectionFilterModel.count = this.collectionPreviewsGridState.gridViewState.getItemsPerPage();
        return this.collectionRepo.fetchCollectionsByFilter(this.collectionFilterModel);
    }

    fetchMiningFarms = async (farmIds: string[]): Promise < MiningFarmEntity[] > => {
        return this.miningFarmRepo.fetchMiningFarmsByIds(farmIds);
    }

}
