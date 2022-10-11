import { makeAutoObservable } from 'mobx';
import CollectionsApi from '../api/CollectionsApi';
import CollectionPreview from '../../entities/CollectionPreview';
import S from '../../../../core/utilities/Main';

export default class ExploreCollectionsStore {

    static TOP_COLLECTION_PERIODS = [
        '1 Day',
        '7 Days',
        '30 Days',
    ]

    collectionsApi: CollectionsApi;

    selectedCategoryIndex: number;
    searchString: string;
    selectedTopCollectionPeriod: number;

    topCollectionPreviews: CollectionPreview[];
    cudosPrice: number;
    cudosPriceChange: number;
    categories: string[];

    constructor() {
        this.collectionsApi = new CollectionsApi();

        this.topCollectionPreviews = [];
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

    innitialLoad() {
        this.resetDefaults();
        this.getCategories();
        this.getCudosPrice();
        this.getTopCollections();
    }

    getCudosPrice() {
        // TODO: query price
        this.cudosPrice = 0.05;
        this.cudosPriceChange = 23;
    }

    getTopCollections() {
        this.collectionsApi.getTopCollections(this.selectedTopCollectionPeriod, (collections: CollectionPreview[]) => {
            this.topCollectionPreviews = collections;
        })
    }

    getCategories() {
        this.collectionsApi.getCategories((categories: string[]) => {
            this.categories = categories;
        })
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
