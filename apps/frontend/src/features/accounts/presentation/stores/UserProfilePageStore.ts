import { makeAutoObservable, runInAction } from 'mobx';
import GridViewState from '../../../../core/presentation/stores/GridViewState';
import NftRepo from '../../../nft/presentation/repos/NftRepo';
import S from '../../../../core/utilities/Main';
import NftEntity from '../../../nft/entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import NftFilterModel from '../../../nft/utilities/NftFilterModel';

export enum ProfilePages {
    NFTS,
    EARNINGS,
    HISTORY
}

export default class UserProfilePageStore {

    walletStore: WalletStore;
    nftRepo: NftRepo;
    collectionRepo: CollectionRepo;

    profilePage: number;
    gridViewState: GridViewState;
    nftFilterModel: NftFilterModel;

    nftEntities: NftEntity[];
    collectionEntitiesMap: Map < string, CollectionEntity >;

    constructor(walletStore: WalletStore, nftRepo: NftRepo, collectionRepo: CollectionRepo) {
        this.walletStore = walletStore;
        this.nftRepo = nftRepo;
        this.collectionRepo = collectionRepo;

        this.profilePage = ProfilePages.NFTS;
        this.gridViewState = new GridViewState(this.fetch, 3, 4, 6)
        this.nftFilterModel = new NftFilterModel();
        this.nftFilterModel.sessionAccount = S.INT_TRUE;

        this.nftEntities = [];
        this.collectionEntitiesMap = null;

        makeAutoObservable(this);
    }

    async init() {
        await this.fetch();
    }

    fetch = async () => {
        this.gridViewState.setIsLoading(true);

        this.nftFilterModel.from = this.gridViewState.getFrom();
        this.nftFilterModel.count = this.gridViewState.getItemsPerPage();

        const { nftEntities, total } = await this.nftRepo.fetchNftsByFilter(this.nftFilterModel);
        const collectionEntities = await this.collectionRepo.fetchCollectionsByIds(nftEntities.map((nftEntity: NftEntity) => {
            return nftEntity.collectionId
        }));

        const collectionEntitiesMap = new Map();
        collectionEntities.forEach((collectionEntity) => {
            return collectionEntitiesMap.set(collectionEntity.id, collectionEntities);
        });

        runInAction(() => {
            this.nftEntities = nftEntities;
            this.collectionEntitiesMap = collectionEntitiesMap;
            this.gridViewState.setTotalItems(total);
            this.gridViewState.setIsLoading(false);
        });
    }

    isNftPage(): boolean {
        return this.profilePage === ProfilePages.NFTS;
    }

    isEarningsPage(): boolean {
        return this.profilePage === ProfilePages.EARNINGS;
    }

    isHistoryPage(): boolean {
        return this.profilePage === ProfilePages.HISTORY;
    }

    markNftPage = () => {
        this.profilePage = ProfilePages.NFTS;
    }

    markEarningsPage = () => {
        this.profilePage = ProfilePages.EARNINGS;
    }

    markHistoryPage = () => {
        this.profilePage = ProfilePages.HISTORY;
    }

    getCollectionName(collectionId: string): string {
        return this.collectionEntitiesMap.get(collectionId)?.name ?? '';
    }

    onChangeSortKey = (sortKey: number) => {
        this.nftFilterModel.sortKey = sortKey;
        this.fetch();
    }
}
