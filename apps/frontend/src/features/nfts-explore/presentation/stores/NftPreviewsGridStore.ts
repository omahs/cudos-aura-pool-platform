import { makeAutoObservable } from 'mobx';
import TableStore from '../../../../core/presentation/stores/TableStore';
import S from '../../../../core/utilities/Main';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import NftPreviewModel from '../../entities/NftPreviewModel';
import NftRepo from '../repos/NftRepo';

export default class NftPreviewsGridStore {

    static TABLE_KEYS = ['Name', 'Price'];

    static GRID_SETTING_DENSE = 0;
    static GRID_SETTING_LOOSE = 1;

    static LOOSE_SETTING_SIZE = 12;
    static DENSE_SETTING_SIZE = 20;

    nftRepo: NftRepo;
    collectionRepo: CollectionRepo;

    collectionId: string;
    searchString: string;

    tableHelper: TableStore;
    gridSetting: number;
    selectedSortIndex: number;
    selectedCategoryIndex: number;

    nftPreviews: NftPreviewModel[];
    categories: string[];

    isFetchingNfts: boolean;

    constructor(nftRepo: NftRepo, collectionRepo: CollectionRepo) {
        this.nftRepo = nftRepo;
        this.collectionRepo = collectionRepo;

        this.tableHelper = new TableStore(S.NOT_EXISTS, [], this.fetchViewingModels, NftPreviewsGridStore.LOOSE_SETTING_SIZE);
        this.nftPreviews = [];
        this.categories = [];

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.isFetchingNfts = false;
        this.selectedSortIndex = 0;
        this.collectionId = S.Strings.EMPTY;
        this.searchString = S.Strings.EMPTY;
        this.selectedCategoryIndex = 0;
        this.searchString = S.Strings.EMPTY;
        this.setGridSettingAndPreviewCount(NftPreviewsGridStore.GRID_SETTING_LOOSE);
    }

    async innitialLoad() {
        this.resetDefaults();

        await this.getCategories();

        this.fetchViewingModels();
    }

    fetchViewingModels = () => {
        this.setIsLoading(true);
        this.nftRepo.getNftsByCategoryAndSearchSortedPaginated(
            this.collectionId,
            this.searchString,
            this.getCategoryName(),
            this.getSelectedKey(),
            this.getFrom(),
            this.getItemsPerPage(),
            (nftPreviews: NftPreviewModel[], total) => {
                this.setNftPreviews(nftPreviews);
                this.setTotalItems(total);
                this.setIsLoading(false);
            },
        )
    }

    setGridSettingAndPreviewCount(setting: number) {
        this.gridSetting = setting;

        switch (setting) {
            case NftPreviewsGridStore.GRID_SETTING_DENSE:
                this.tableHelper.tableState.itemsPerPage = NftPreviewsGridStore.DENSE_SETTING_SIZE;
                break;
            case NftPreviewsGridStore.GRID_SETTING_LOOSE:
            default:
                this.tableHelper.tableState.itemsPerPage = NftPreviewsGridStore.LOOSE_SETTING_SIZE;
        }

    }

    getSelectedKey() {
        return NftPreviewsGridStore.TABLE_KEYS[this.selectedSortIndex];
    }

    getFrom() {
        return this.tableHelper.tableState.from;
    }

    getItemsPerPage() {
        return this.tableHelper.tableState.itemsPerPage;
    }

    getItemCount() {
        return this.tableHelper.tableState.total;
    }

    getGridSettingClass() {
        return this.gridSetting === NftPreviewsGridStore.GRID_SETTING_LOOSE ? 'GridColumns3' : 'GridColumns4';
    }

    checkIsGridSettingSelected(setting: number): boolean {
        return this.gridSetting === setting;
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

    setIsLoading(isFetching: boolean) {
        this.isFetchingNfts = isFetching;
    }

    setNftPreviews(nftPreviews: NftPreviewModel[]) {
        this.nftPreviews = nftPreviews;
    }

    setTotalItems(count: number) {
        this.tableHelper.tableState.total = count;
    }
}
