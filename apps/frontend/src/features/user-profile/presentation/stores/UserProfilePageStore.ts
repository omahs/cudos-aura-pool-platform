import GridViewStore from '../../../../core/presentation/stores/GridViewStore';
import { makeAutoObservable, observable } from 'mobx';
import NftRepo from '../../../nfts-explore/presentation/repos/NftRepo';
import NftPreviewEntity from '../../../nfts-explore/entities/NftPreviewEntity';
import UserProfileRepo from '../repos/UserProfileRepo';
import UserProfileEntity from '../../entities/UserProfileEntity';
import S from '../../../../core/utilities/Main';
import BitcoinRepo from '../../../bitcoin-data/presentation/repos/BitcoinRepo';

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

    @observable gridViewStore: GridViewStore;
    userProfileModel: UserProfileEntity;
    selectedSortIndex: number;
    nftPreviews: NftPreviewEntity[];
    bitcoinPrice: number;
    profilePage: number;

    constructor(nftRepo: NftRepo, userRepo: UserProfileRepo, bitcoinRepo: BitcoinRepo) {
        this.nftRepo = nftRepo;
        this.userRepo = userRepo;
        this.bitcoinRepo = bitcoinRepo;

        this.userProfileModel = null;
        this.gridViewStore = new GridViewStore(this.fetchViewingModels, 3, 4, 6)
        this.nftPreviews = [];
        this.bitcoinPrice = S.NOT_EXISTS;
        this.profilePage = S.NOT_EXISTS;

        makeAutoObservable(this);
    }

    innitiate(userAddress: string, callback: () => void) {
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
            (nftPreviews: NftPreviewEntity[], total) => {
                this.setNftPreviews(nftPreviews);
                this.gridViewStore.setTotalItems(total);
                this.gridViewStore.setIsLoading(false);
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

    setNftPreviews(nftPreviews: NftPreviewEntity[]) {
        this.nftPreviews = nftPreviews;
    }

    setProfilePage(page: number) {
        this.profilePage = page;
    }

}
