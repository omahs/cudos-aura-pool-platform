import GridViewStore from '../../../../core/presentation/stores/GridViewStore';
import { makeAutoObservable, observable } from 'mobx';
import NftRepo from '../../../nfts-explore/presentation/repos/NftRepo';
import UserProfileRepo from '../repos/UserProfileRepo';
import UserProfileEntity from '../../entities/UserProfileEntity';
import S from '../../../../core/utilities/Main';
import BitcoinRepo from '../../../bitcoin-data/presentation/repos/BitcoinRepo';
import NftEntity from '../../../nft-details/entities/NftEntity';
import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';
import CollectionRepo from '../../../collections-marketplace/presentation/repos/CollectionRepo';

export enum PROFILE_PAGES {
    NFTS,
    EARNINGS,
    HISTORY
}

export default class UserProfilePageStore {

    static TABLE_KEYS = ['Name', 'Price'];

    nftRepo: NftRepo;
    userRepo: UserProfileRepo;
    bitcoinRepo: BitcoinRepo;
    collectionRepo: CollectionRepo;

    @observable gridViewStore: GridViewStore;
    userProfileModel: UserProfileEntity;
    selectedSortIndex: number;
    nftEntities: NftEntity[];
    collectionProfileEntities: CollectionProfileEntity[];
    bitcoinPrice: number;
    profilePage: number;

    constructor(nftRepo: NftRepo, collectionRepo: CollectionRepo, userRepo: UserProfileRepo, bitcoinRepo: BitcoinRepo) {
        this.nftRepo = nftRepo;
        this.userRepo = userRepo;
        this.bitcoinRepo = bitcoinRepo;
        this.collectionRepo = collectionRepo;

        this.userProfileModel = null;
        this.gridViewStore = new GridViewStore(this.fetchViewingModels, 3, 4, 6)
        this.nftEntities = [];
        this.bitcoinPrice = S.NOT_EXISTS;
        this.profilePage = S.NOT_EXISTS;

        makeAutoObservable(this);
    }

    init(userAddress: string, callback: () => void) {
        this.selectedSortIndex = 0;
        this.profilePage = PROFILE_PAGES.NFTS;

        this.userRepo.fetchProfileByAddress(userAddress, (userProfileModel) => {
            this.userProfileModel = userProfileModel;

            this.fetchViewingModels();
            callback();
        });

        this.bitcoinRepo.getBitcoinData((bitcoinData) => {
            this.bitcoinPrice = bitcoinData.price;
        })
    }

    fetchViewingModels = () => {
        this.gridViewStore.setIsLoading(true);
        this.nftRepo.getNftsByOwnerAddressSortedPaginated(
            this.userProfileModel.address,
            this.getSelectedKey(),
            this.gridViewStore.getFrom(),
            this.gridViewStore.getItemsPerPage(),
            (nftEntities: NftEntity[], total) => {
                const collectionIds = nftEntities.map((nftEntity: NftEntity) => nftEntity.collectionId);
                this.collectionRepo.getCollectionsByIds(collectionIds)
                    .then((collectionProfileEntities: CollectionProfileEntity[]) => {
                        this.collectionProfileEntities = collectionProfileEntities;
                        this.setNftPreviews(nftEntities);
                        this.gridViewStore.setTotalItems(total);
                        this.gridViewStore.setIsLoading(false);
                    })
            },
        )
    }

    getSelectedKey() {
        return UserProfilePageStore.TABLE_KEYS[this.selectedSortIndex];
    }

    setSortByIndex = (index: number) => {
        this.selectedSortIndex = index;

        this.fetchViewingModels();
    }

    setNftPreviews(nftEntities: NftEntity[]) {
        this.nftEntities = nftEntities;
    }

    setProfilePage(page: number) {
        this.profilePage = page;
    }

    getCollectionById(collectionId: string): CollectionProfileEntity {
        const collectionProfileEntity = this.collectionProfileEntities.find((entity: CollectionProfileEntity) => entity.id === collectionId)
        return collectionProfileEntity;
    }
}
