import { makeAutoObservable, observable } from 'mobx';
import GridViewState from '../../../../core/presentation/stores/GridViewState';
import NftRepo from '../../../nft/presentation/repos/NftRepo';
import S from '../../../../core/utilities/Main';
import NftEntity from '../../../nft/entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';

export enum PROFILE_PAGES {
    NFTS,
    EARNINGS,
    HISTORY
}

export default class UserProfilePageStore {

    static TABLE_KEYS = ['Name', 'Price'];

    bitcoinStore: BitcoinStore;
    walletStore: WalletStore;

    nftRepo: NftRepo;
    collectionRepo: CollectionRepo;

    @observable gridViewState: GridViewState;
    selectedSortIndex: number;
    nftEntities: NftEntity[];
    collectionEntities: CollectionEntity[];
    bitcoinPrice: number;
    profilePage: number;

    constructor(bitcoinStore: BitcoinStore, walletStore: WalletStore, nftRepo: NftRepo, collectionRepo: CollectionRepo) {
        this.bitcoinStore = bitcoinStore;
        this.walletStore = walletStore;
        this.nftRepo = nftRepo;
        this.collectionRepo = collectionRepo;

        this.gridViewState = new GridViewState(this.fetchViewingModels, 3, 4, 6)
        this.selectedSortIndex = 0;
        this.nftEntities = [];
        this.collectionEntities = [];
        this.bitcoinPrice = S.NOT_EXISTS;
        this.profilePage = S.NOT_EXISTS;

        makeAutoObservable(this);
    }

    async init() {
        await this.bitcoinStore.init();

        this.selectedSortIndex = 0;
        this.profilePage = PROFILE_PAGES.NFTS;

        await this.fetchViewingModels();

        this.bitcoinPrice = this.bitcoinStore.getBitcoinPrice();
    }

    fetchViewingModels = async () => {
        this.gridViewState.setIsLoading(true);
        const { nftEntities, total } = await this.nftRepo.fetchNftsByOwnerAddressSortedPaginated(
            this.walletStore.getAddress(),
            this.getSelectedKey(),
            this.gridViewState.getFrom(),
            this.gridViewState.getItemsPerPage(),
        );

        const collectionIds = nftEntities.map((nftEntity: NftEntity) => nftEntity.collectionId);
        this.collectionEntities = await this.collectionRepo.fetchCollectionsByIds(collectionIds);
        this.setNftEntities(nftEntities);
        this.gridViewState.setTotalItems(total);
        this.gridViewState.setIsLoading(false);
    }

    getSelectedKey() {
        return UserProfilePageStore.TABLE_KEYS[this.selectedSortIndex];
    }

    setSortByIndex = (index: number) => {
        this.selectedSortIndex = index;

        this.fetchViewingModels();
    }

    setNftEntities(nftEntities: NftEntity[]) {
        this.nftEntities = nftEntities;
    }

    setProfilePage(page: number) {
        this.profilePage = page;
    }

    getCollectionById(collectionId: string): CollectionEntity {
        const collectionEntity = this.collectionEntities.find((entity: CollectionEntity) => entity.id === collectionId)
        return collectionEntity;
    }
}
