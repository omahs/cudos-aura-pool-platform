import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import S from '../../../../core/utilities/Main';
import CollectionRepo from '../repos/CollectionRepo';

export default class ExploreCollectionsStore {

    static TOP_COLLECTION_PERIODS = [
        '1 Day',
        '7 Days',
        '30 Days',
    ]

    collectionRepo: CollectionRepo;

    selectedCategoryIndex: number;
    searchString: string;
    selectedTopCollectionPeriod: number;

    topCollectionEntities: CollectionEntity[];
    cudosPrice: number;
    cudosPriceChange: number;
    categories: string[];

    constructor(collectionRepo: CollectionRepo) {
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
        this.collectionRepo.getTopCollections(this.selectedTopCollectionPeriod, (collectionEntities: CollectionEntity[]) => {
            this.topCollectionEntities = collectionEntities;
        })
    }

    getCategories() {
        this.collectionRepo.getCategories((categories: string[]) => {
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
