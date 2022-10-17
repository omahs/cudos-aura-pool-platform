import { makeAutoObservable } from 'mobx';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import CategoryEntity from '../../entities/CategoryEntity';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';
import CollectionRepo from '../repos/CollectionRepo';
import CollectionPreviewsGridState from './CollectionPreviewsGridState';

export default class ExploreCollectionsPageState {

    collectionRepo: CollectionRepo;
    miningFarmRepo: MiningFarmRepo;

    collectionFilterModel: CollectionFilterModel;
    collectionPreviewsGridState: CollectionPreviewsGridState;

    categories: CategoryEntity[];

    constructor(collectionRepo: CollectionRepo, miningFarmRepo: MiningFarmRepo) {
        this.collectionRepo = collectionRepo;
        this.miningFarmRepo = miningFarmRepo;

        this.categories = [];
        this.collectionFilterModel = new CollectionFilterModel();
        this.collectionPreviewsGridState = new CollectionPreviewsGridState(this.fetchCollections, this.fetchMiningFarms);

        makeAutoObservable(this);
    }

    async init(categories) {
        this.categories = categories;
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

    searchString(): string {
        return this.collectionFilterModel.searchString;
    }

    setSearchString = (string) => {
        this.collectionFilterModel.searchString = string;
        this.collectionPreviewsGridState.fetchViewingModels();
    }

    toggleCategory(index: number) {
        const filterModel = this.collectionFilterModel;
        if (filterModel.categoryIds.includes(index.toString()) === false) {
            filterModel.categoryIds.push(index.toString());
        } else {
            filterModel.categoryIds = filterModel.categoryIds.filter((id) => id !== index.toString())
        }

        this.collectionPreviewsGridState.fetchViewingModels();
    }

    isCategorySelected(index: number): boolean {
        return this.collectionFilterModel.categoryIds.includes(index.toString());
    }

    getCategoryName(): string {
        return this.categories[this.collectionFilterModel.sortKey].categoryName;
    }

}
