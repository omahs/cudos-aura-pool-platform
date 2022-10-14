import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import S from '../../../../core/utilities/Main';
import CollectionRepo from '../repos/CollectionRepo';
import CudosStore from '../../../cudos-data/presentation/stores/CudosStore';

export default class MarketplaceStore {

    static TOP_COLLECTION_PERIODS = [
        '1 Day',
        '7 Days',
        '30 Days',
    ]

    cudosStore: CudosStore;

    collectionRepo: CollectionRepo;

    selectedCategoryIndex: number;
    searchString: string;
    selectedTopCollectionPeriod: number;

    topCollectionEntities: CollectionEntity[];
    cudosPrice: number;
    cudosPriceChange: number;
    categories: string[];

    constructor(cudosStore: CudosStore, collectionRepo: CollectionRepo) {
        this.cudosStore = cudosStore;
        this.collectionRepo = collectionRepo;

        this.topCollectionEntities = [];
        this.categories = [];
        this.cudosPrice = S.NOT_EXISTS;
        this.cudosPriceChange = S.NOT_EXISTS;

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.selectedCategoryIndex = 0;
        this.searchString = S.Strings.EMPTY;
        this.selectedTopCollectionPeriod = 0;
    }

    async init() {
        await this.cudosStore.init();

        this.resetDefaults();
        this.categories = await this.collectionRepo.fetchCategories();
        this.topCollectionEntities = await this.collectionRepo.fetchTopCollections(this.selectedTopCollectionPeriod);

        this.cudosPrice = this.cudosStore.getCudosPrice();
        this.cudosPriceChange = this.cudosStore.getBitcoinPriceChange();
    }

    selectCategory(index: number) {
        this.selectedCategoryIndex = index;
    }

    changeTopCollectionPeriod = (index: number) => {
        this.selectedTopCollectionPeriod = index;
        // TODO: get new preview models from new period;
    }

    changeSearchString = (searchString: string) => {
        this.searchString = searchString;
    }

    cudosPriceChangeDisplay() {
        const priceChange = this.cudosPriceChange === S.NOT_EXISTS ? 0 : this.cudosPriceChange;

        const sign = priceChange >= 0 ? '+' : '-';

        return `${sign} ${priceChange.toFixed(1)}%`;
    }
}
