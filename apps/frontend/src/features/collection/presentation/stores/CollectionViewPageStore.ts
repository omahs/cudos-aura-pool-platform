import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../repos/CollectionRepo';
import NftPreviewsGridStore from '../../../nft/presentation/stores/NftPreviewsGridStore';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';

export default class CollectionViewPageStore {
    collectionRepo: CollectionRepo;
    miningFarmRepo: MiningFarmRepo;

    collectionEntity: CollectionEntity;
    miningFarmEntity: MiningFarmEntity;
    nftPreviewsGridStore: NftPreviewsGridStore;

    constructor(collectionRepo: CollectionRepo, miningFarmRepo: MiningFarmRepo) {
        this.collectionRepo = collectionRepo;
        this.miningFarmRepo = miningFarmRepo;

        this.collectionEntity = null;
        this.miningFarmEntity = null;
        this.nftPreviewsGridStore = null;

        makeAutoObservable(this);
    }

    async init(collectionId: string, nftPreviewsGridStore: NftPreviewsGridStore) {
        this.nftPreviewsGridStore = nftPreviewsGridStore;
        this.nftPreviewsGridStore.collectionId = collectionId;

        const collectionEntity = await this.collectionRepo.fetchCollectionEntity(collectionId);
        this.miningFarmRepo.getFarmById(collectionEntity.farmId, (miningFarmEntity: MiningFarmEntity) => {
            this.miningFarmEntity = miningFarmEntity;
            this.collectionEntity = collectionEntity;
            this.nftPreviewsGridStore.fetchViewingModels();
        })
    }
}
