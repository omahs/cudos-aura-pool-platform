import GridViewStore from '../../../../core/presentation/stores/GridViewStore';
import { makeAutoObservable, observable } from 'mobx';
import S from '../../../../core/utilities/Main';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import NftPreviewEntity from '../../entities/NftPreviewEntity';
import NftRepo from '../repos/NftRepo';

export default class NftPreviewsGridStore {

    static TABLE_KEYS = ['Name', 'Price'];

    nftRepo: NftRepo;
    collectionRepo: CollectionRepo;

    @observable gridViewStore: GridViewStore;

    collectionId: string;
    searchString: string;
    selectedSortIndex: number;
    selectedCategoryIndex: number;

    nftPreviews: NftPreviewEntity[];
    categories: string[];

    constructor(nftRepo: NftRepo, collectionRepo: CollectionRepo) {
        this.nftRepo = nftRepo;
        this.collectionRepo = collectionRepo;

        this.gridViewStore = new GridViewStore(this.fetchViewingModels, 3, 4, 6)
        this.nftPreviews = [];
        this.categories = [];

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.gridViewStore.resetDefaults()
        this.selectedSortIndex = 0;
        this.collectionId = S.Strings.EMPTY;
        this.searchString = S.Strings.EMPTY;
        this.selectedCategoryIndex = 0;
        this.searchString = S.Strings.EMPTY;
        this.nftPreviews = [];
    }

    async innitialLoad() {
        await this.getCategories();

        this.fetchViewingModels();
    }

    fetchViewingModels = () => {
        this.gridViewStore.setIsLoading(true);
        this.nftRepo.getNftsByCategoryAndSearchSortedPaginated(
            this.collectionId,
            this.searchString,
            this.getCategoryName(),
            this.getSelectedKey(),
            this.gridViewStore.getFrom(),
            this.gridViewStore.getItemsPerPage(),
            (nftPreviews: NftPreviewEntity[], total) => {
                this.setNftPreviews(nftPreviews);
                this.gridViewStore.setTotalItems(total);
                this.gridViewStore.setIsLoading(false);
            },
        )
    }

    getSelectedKey() {
        return NftPreviewsGridStore.TABLE_KEYS[this.selectedSortIndex];
    }

    async getCategories() {
        this.collectionRepo.getCategories((categories: string[]) => {
            this.categories = categories;
        })
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

    setNftPreviews(nftPreviews: NftPreviewEntity[]) {
        this.nftPreviews = nftPreviews;
    }
}
