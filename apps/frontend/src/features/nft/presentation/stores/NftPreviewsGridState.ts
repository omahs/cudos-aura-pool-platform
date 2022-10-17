import GridViewState from '../../../../core/presentation/stores/GridViewState';
import { makeAutoObservable, observable } from 'mobx';
import S from '../../../../core/utilities/Main';
import NftEntity from '../../entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CategoryEntity from '../../../collection/entities/CategoryEntity';

export default class NftPreviewsGridState {

    static TABLE_KEYS = ['Name', 'Price'];

    fetchFunction: () => Promise < {nftEntities: NftEntity[], total: number, collectionEntities: CollectionEntity[] }>;
    @observable gridViewState: GridViewState;

    collectionId: string;
    searchString: string;
    selectedSortIndex: number;
    selectedCategoryIndex: number;

    collectionEntities: CollectionEntity[];
    nftEntities: NftEntity[];
    categories: CategoryEntity[];

    constructor(fetchFunction: () => Promise < {nftEntities: NftEntity[], total: number, collectionEntities: CollectionEntity[] }>) {
        this.fetchFunction = fetchFunction;

        this.gridViewState = new GridViewState(this.fetchViewingModels, 3, 4, 6)
        this.nftEntities = [];
        this.collectionEntities = [];
        this.categories = [];

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.gridViewState.resetDefaults()
        this.selectedSortIndex = 0;
        this.collectionId = S.Strings.EMPTY;
        this.searchString = S.Strings.EMPTY;
        this.selectedCategoryIndex = 0;
        this.nftEntities = [];
        this.collectionEntities = [];
    }

    async init(categories) {
        this.categories = categories;
        await this.fetchViewingModels();
    }

    fetchViewingModels = async () => {
        this.gridViewState.setIsLoading(true);
        const { nftEntities, total, collectionEntities } = await this.fetchFunction();

        this.collectionEntities = collectionEntities;
        this.setNftEntities(nftEntities);
        this.gridViewState.setTotalItems(total);
        this.gridViewState.setIsLoading(false);
    }

    getSelectedKey() {
        return NftPreviewsGridState.TABLE_KEYS[this.selectedSortIndex];
    }

    selectCategory(index: number) {
        this.selectedCategoryIndex = index;
        this.fetchViewingModels();
    }

    getCategoryName(): string {
        return this.categories[this.selectedCategoryIndex].categoryName;
    }

    changeSearchString = (searchString: string) => {
        this.searchString = searchString;
        this.fetchViewingModels();
    }

    setSortByIndex = (index: number) => {
        this.selectedSortIndex = index;

        this.fetchViewingModels();
    }

    setNftEntities(nftEntities: NftEntity[]) {
        this.nftEntities = nftEntities;
    }

    getCollectionById(collectionId: string): CollectionEntity {
        const collectionEntity = this.collectionEntities.find((colllectionProfileEntity: CollectionEntity) => colllectionProfileEntity.id === collectionId);

        return collectionEntity;
    }
}
