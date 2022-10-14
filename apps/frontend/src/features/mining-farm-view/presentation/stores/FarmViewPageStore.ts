import GridViewStore from '../../../../core/presentation/stores/GridViewStore';
import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../../collections-marketplace/entities/CollectionEntity';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../repos/MiningFarmRepo';

export default class FarmViewPageStore {

    static TABLE_KEYS = ['Name', 'Price'];

    farmRepo: MiningFarmRepo;
    collectionRepo: CollectionRepo;

    gridViewStore: GridViewStore;
    farmProfile: MiningFarmEntity;
    selectedSortIndex: number;
    collectionEntities: CollectionEntity[];

    constructor(farmRepo: MiningFarmRepo, collectionRepo: CollectionRepo) {
        this.farmRepo = farmRepo;
        this.collectionRepo = collectionRepo;

        this.farmProfile = null;
        this.gridViewStore = new GridViewStore(this.fetchViewingModels, 3, 4, 6)
        this.collectionEntities = [];

        makeAutoObservable(this);
    }

    init(farmId: string, callback: () => void) {
        this.selectedSortIndex = 0;
        this.farmRepo.getFarmById(farmId, (farmProfile) => {
            this.farmProfile = farmProfile;

            this.fetchViewingModels()
            callback();
        });
    }

    fetchViewingModels = () => {
        this.gridViewStore.setIsLoading(true);
        console.log(this.getSelectedKey())
        this.collectionRepo.getCollectionsByFarmIdSortedPaginated(
            this.farmProfile.id,
            this.getSelectedKey(),
            this.gridViewStore.getFrom(),
            this.gridViewStore.getItemsPerPage(),
            (collectionEntities: CollectionEntity[], total) => {
                this.setCollectionEntities(collectionEntities);
                this.gridViewStore.setTotalItems(total);
                this.gridViewStore.setIsLoading(false);
            },
        )
    }

    getSelectedKey() {
        return FarmViewPageStore.TABLE_KEYS[this.selectedSortIndex];
    }

    setSortByIndex = (index: number) => {
        this.selectedSortIndex = index;

        this.fetchViewingModels();
    }

    setCollectionEntities(collectionEntities: CollectionEntity[]) {
        this.collectionEntities = collectionEntities;
    }

}
