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

    init(collectionId: string, nftPreviewsGridStore: NftPreviewsGridStore) {
        this.nftPreviewsGridStore = nftPreviewsGridStore;
        this.nftPreviewsGridStore.collectionId = collectionId;

        this.collectionRepo.getCollectionEntity(collectionId, (collectionEntity) => {

            this.miningFarmRepo.getFarmById(collectionEntity.farmId, (miningFarmEntity: MiningFarmEntity) => {
                this.miningFarmEntity = miningFarmEntity;
                this.collectionEntity = collectionEntity;
                this.nftPreviewsGridStore.fetchViewingModels();
            })
        });
    }
}
