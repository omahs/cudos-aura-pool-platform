import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';
import CollectionRepo from '../repos/CollectionRepo';
import CollectionPreviewsGridState from './CollectionPreviewsGridState';

export default class ExploreCollectionsPageState {

    collectionRepo: CollectionRepo;
    miningFarmRepo: MiningFarmRepo;

    collectionFilterModel: CollectionFilterModel;
    collectionPreviewsGridState: CollectionPreviewsGridState;

    constructor(collectionRepo: CollectionRepo, miningFarmRepo: MiningFarmRepo) {
        this.collectionRepo = collectionRepo;
        this.miningFarmRepo = miningFarmRepo;

        this.collectionFilterModel = new CollectionFilterModel();
        this.collectionPreviewsGridState = new CollectionPreviewsGridState(this.fetchCollections, this.fetchMiningFarms);

        makeAutoObservable(this);
    }

    async init() {
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
