import GridViewState from '../../../../core/presentation/stores/GridViewState';
import { makeAutoObservable, observable } from 'mobx';
import S from '../../../../core/utilities/Main';
import CollectionEntity from '../../entities/CollectionEntity';

export default class CollectionPreviewsGridState {

    static TABLE_KEYS = ['Name', 'Price'];

    fetchFunction: () => Promise < {collectionEntities: CollectionEntity[], total: number }>;
    @observable gridViewState: GridViewState;

    searchString: string;
    selectedSortIndex: number;
    selectedCategoryIndex: number;

    collectionEntities: CollectionEntity[];
    categories: string[];

    constructor(fetchFunction: () => Promise < {collectionEntities: CollectionEntity[], total: number }>) {
        this.fetchFunction = fetchFunction;

        this.gridViewState = new GridViewState(this.fetchViewingModels, 3, 4, 6)
        this.collectionEntities = [];
        this.categories = [];

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.gridViewState.resetDefaults()
        this.selectedSortIndex = 0;
        this.searchString = S.Strings.EMPTY;
        this.selectedCategoryIndex = 0;
        this.collectionEntities = [];
    }

    async init(categories) {
        this.categories = categories;
        await this.fetchViewingModels();
    }

    fetchViewingModels = async () => {
        this.gridViewState.setIsLoading(true);
        const { collectionEntities, total } = await this.fetchFunction();

        this.collectionEntities = collectionEntities;
        this.gridViewState.setTotalItems(total);
        this.gridViewState.setIsLoading(false);
    }

    getSelectedKey() {
        return CollectionPreviewsGridState.TABLE_KEYS[this.selectedSortIndex];
    }

    selectCategory(index: number) {
        this.selectedCategoryIndex = index;
        this.fetchViewingModels();
    }

    getCategoryName(): string {
        return this.categories[this.selectedCategoryIndex];
    }

    changeSearchString = (searchString: string) => {
        this.searchString = searchString;
        this.fetchViewingModels();
    }

    setSortByIndex = (index: number) => {
        this.selectedSortIndex = index;

        this.fetchViewingModels();
    }

    getCollectionById(collectionId: string): CollectionEntity {
        const collectionEntity = this.collectionEntities.find((colllectionProfileEntity: CollectionEntity) => colllectionProfileEntity.id === collectionId);

        return collectionEntity;
    }
}
