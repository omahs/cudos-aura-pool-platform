import GridViewStore from '../../../../core/presentation/stores/GridViewStore';
import { makeAutoObservable, observable } from 'mobx';
import S from '../../../../core/utilities/Main';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';
import NftRepo from '../repos/NftRepo';
import NftEntity from '../../../nft-details/entities/NftEntity';
import CollectionEntity from '../../../collections-marketplace/entities/CollectionEntity';

export default class NftPreviewsGridStore {

    static TABLE_KEYS = ['Name', 'Price'];

    nftRepo: NftRepo;
    collectionRepo: CollectionRepo;

    @observable gridViewStore: GridViewStore;

    collectionId: string;
    searchString: string;
    selectedSortIndex: number;
    selectedCategoryIndex: number;

    collectionEntities: CollectionEntity[];
    nftEntities: NftEntity[];
    categories: string[];

    constructor(nftRepo: NftRepo, collectionRepo: CollectionRepo) {
        this.nftRepo = nftRepo;
        this.collectionRepo = collectionRepo;

        this.gridViewStore = new GridViewStore(this.fetchViewingModels, 3, 4, 6)
        this.nftEntities = [];
        this.collectionEntities = [];
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
        this.nftEntities = [];
        this.collectionEntities = [];
    }

    async innitialLoad() {
        await this.getCategories();

        this.fetchViewingModels();
    }

    fetchViewingModels = () => {
        this.gridViewStore.setIsLoading(true);
        this.nftRepo.getNftsByCollectionIdCategoryAndSearchSortedPaginated(
            this.collectionId,
            this.searchString,
            this.getCategoryName(),
            this.getSelectedKey(),
            this.gridViewStore.getFrom(),
            this.gridViewStore.getItemsPerPage(),
            (nftEntities: NftEntity[], total) => {
                const collectionIds = nftEntities.map((nftEntity: NftEntity) => nftEntity.collectionId);

                this.collectionRepo.getCollectionsByIds(collectionIds)
                    .then((collectionEntities: CollectionEntity[]) => {
                        this.collectionEntities = collectionEntities;
                        this.setNftEntities(nftEntities);
                        this.gridViewStore.setTotalItems(total);
                        this.gridViewStore.setIsLoading(false);
                    });
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

    setNftEntities(nftEntities: NftEntity[]) {
        this.nftEntities = nftEntities;
    }

    getCollectionById(collectionId: string): CollectionEntity {
        const collectionEntity = this.collectionEntities.find((colllectionProfileEntity: CollectionEntity) => colllectionProfileEntity.id === collectionId);

        return collectionEntity;
    }
}
