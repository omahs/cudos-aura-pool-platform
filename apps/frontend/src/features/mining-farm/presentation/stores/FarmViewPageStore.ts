import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../repos/MiningFarmRepo';
import CollectionPreviewsGridState from '../../../collection/presentation/stores/CollectionPreviewsGridState';
import CollectionFilterModel from '../../../collection/utilities/CollectionFilterModel';

export default class FarmViewPageStore {

    static TABLE_KEYS = ['Name', 'Price'];

    farmRepo: MiningFarmRepo;
    collectionRepo: CollectionRepo;

    collectionFilterModel: CollectionFilterModel;

    collectionPreviewsGridState: CollectionPreviewsGridState;
    farmProfile: MiningFarmEntity;
    selectedSortIndex: number;
    collectionEntities: CollectionEntity[];

    constructor(farmRepo: MiningFarmRepo, collectionRepo: CollectionRepo) {
        this.farmRepo = farmRepo;
        this.collectionRepo = collectionRepo;

        this.collectionFilterModel = new CollectionFilterModel();

        this.farmProfile = null;
        this.collectionPreviewsGridState = new CollectionPreviewsGridState(this.fetchViewingModels);
        this.collectionEntities = [];

        makeAutoObservable(this);
    }

    async init(farmId: string) {
        this.selectedSortIndex = 0;
        this.farmProfile = await this.farmRepo.fetchMiningFarmById(farmId);
        this.collectionPreviewsGridState.init([]);

        this.collectionFilterModel.farmId = this.farmProfile.id;
    }

    fetchViewingModels = async (): Promise < {collectionEntities: CollectionEntity[], total: number} > => {
        return this.collectionRepo.fetchCollectionsByFarmIdSortedPaginated(
            this.farmProfile.id,
            this.collectionPreviewsGridState.getSelectedKey(),
            this.collectionPreviewsGridState.gridViewState.getFrom(),
            this.collectionPreviewsGridState.gridViewState.getItemsPerPage(),
        );
    }

    setSortByIndex = (index: number) => {
        this.selectedSortIndex = index;

        this.fetchViewingModels();
    }

    setCollectionEntities(collectionEntities: CollectionEntity[]) {
        this.collectionEntities = collectionEntities;
    }

}
