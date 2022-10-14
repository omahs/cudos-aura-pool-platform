import GridViewStore from '../../../../core/presentation/stores/GridViewStore';
import { makeAutoObservable, observable } from 'mobx';
import NftRepo from '../../../nft/presentation/repos/NftRepo';
import UserRepo from '../repos/UserRepo';
import UserEntity from '../../entities/UserEntity';
import S from '../../../../core/utilities/Main';
import NftEntity from '../../../nft/entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';

export enum PROFILE_PAGES {
    NFTS,
    EARNINGS,
    HISTORY
}

export default class UserProfilePageStore {

    static TABLE_KEYS = ['Name', 'Price'];

    bitcoinStore: BitcoinStore

    nftRepo: NftRepo;
    userRepo: UserRepo;
    collectionRepo: CollectionRepo;

    userEntity: UserEntity;
    @observable gridViewStore: GridViewStore;
    selectedSortIndex: number;
    nftEntities: NftEntity[];
    collectionEntities: CollectionEntity[];
    bitcoinPrice: number;
    profilePage: number;

    constructor(bitcoinStore: BitcoinStore, nftRepo: NftRepo, collectionRepo: CollectionRepo, userRepo: UserRepo) {
        this.bitcoinStore = bitcoinStore;
        this.nftRepo = nftRepo;
        this.userRepo = userRepo;
        this.collectionRepo = collectionRepo;

        this.userEntity = null;
        this.gridViewStore = new GridViewStore(this.fetchViewingModels, 3, 4, 6)
        this.selectedSortIndex = 0;
        this.nftEntities = [];
        this.collectionEntities = [];
        this.bitcoinPrice = S.NOT_EXISTS;
        this.profilePage = S.NOT_EXISTS;

        makeAutoObservable(this);
    }

    async init(userAddress: string, callback: () => void) {
        await this.bitcoinStore.init();

        this.selectedSortIndex = 0;
        this.profilePage = PROFILE_PAGES.NFTS;

        this.userRepo.fetchProfileByAddress(userAddress, async (userEntity) => {
            this.userEntity = userEntity;

            await this.fetchViewingModels();
            callback();
        });

        this.bitcoinPrice = this.bitcoinStore.getBitcoinPrice();
    }

    fetchViewingModels = async () => {
        this.gridViewStore.setIsLoading(true);
        const { nftEntities, total } = await this.nftRepo.fetchNftsByOwnerAddressSortedPaginated(
            this.userEntity.address,
            this.getSelectedKey(),
            this.gridViewStore.getFrom(),
            this.gridViewStore.getItemsPerPage(),
        );

        const collectionIds = nftEntities.map((nftEntity: NftEntity) => nftEntity.collectionId);
        this.collectionEntities = await this.collectionRepo.fetchCollectionsByIds(collectionIds);
        this.setNftEntities(nftEntities);
        this.gridViewStore.setTotalItems(total);
        this.gridViewStore.setIsLoading(false);
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
