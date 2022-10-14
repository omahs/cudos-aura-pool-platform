import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import S from '../../../../core/utilities/Main';
import CollectionRepo from '../repos/CollectionRepo';
import CudosStore from '../../../cudos-data/presentation/stores/CudosStore';
import NftEntity from '../../../nft/entities/NftEntity';
import NftRepo from '../../../nft/presentation/repos/NftRepo';

export default class MarketplaceStore {

    static TOP_COLLECTION_PERIODS = [
        '1 Day',
        '7 Days',
        '30 Days',
    ]

    cudosStore: CudosStore;

    collectionRepo: CollectionRepo;
    nftRepo: NftRepo;

    selectedCategoryIndex: number;
    searchString: string;
    selectedTopCollectionPeriod: number;

    collectionMap: Map < string, CollectionEntity >;
    topCollectionEntities: CollectionEntity[];
    newNftDropsEntities: NftEntity[];
    trendingNftEntities: NftEntity[];

    cudosPrice: number;
    cudosPriceChange: number;
    categories: string[];

    constructor(cudosStore: CudosStore, collectionRepo: CollectionRepo, nftRepo: NftRepo) {
        this.cudosStore = cudosStore;
        this.collectionRepo = collectionRepo;
        this.nftRepo = nftRepo;

        this.topCollectionEntities = [];
        this.newNftDropsEntities = [];
        this.trendingNftEntities = [];

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

        this.topCollectionEntities = [];
        this.newNftDropsEntities = [];
        this.trendingNftEntities = [];
    }

    async init() {
        await this.cudosStore.init();

        this.resetDefaults();

        // fetching data
        this.getCategories();
        await this.fetchTopCollections();
        await this.fetchNewNftDrops();
        this.fetchTrendingNfts();

        this.cudosPrice = this.cudosStore.getCudosPrice();
        this.cudosPriceChange = this.cudosStore.getBitcoinPriceChange();
    }

    async fetchTopCollections() {
        this.topCollectionEntities = await this.collectionRepo.fetchTopCollections(this.selectedTopCollectionPeriod);

        this.topCollectionEntities.forEach((collectionEntity: CollectionEntity) => {
            this.collectionMap.set(collectionEntity.id, collectionEntity);
        })
    }

    async fetchNewNftDrops() {
        this.newNftDropsEntities = await this.nftRepo.fetchNewNftDrops();

        const collectionIdsToFetch = this.newNftDropsEntities
            .filter((nftEntity: NftEntity) => this.collectionMap.has(nftEntity.collectionId) === false)
            .map((nftEntity: NftEntity) => nftEntity.collectionId);

        // const fetchedCollections =
    }

    async fetchTrendingNfts() {
        this.trendingNftEntities = await this.nftRepo.fetchTrendingNfts();
    }

    getCategories() {
        this.collectionRepo.getCategories((categories: string[]) => {
            this.categories = categories;
        })
    }

    // getCollectionById

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
