import { makeAutoObservable } from 'mobx';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../repos/CollectionRepo';
import NftPreviewsGridState from '../../../nft/presentation/stores/NftPreviewsGridState';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import NftEntity from '../../../nft/entities/NftEntity';
import NftRepo from '../../../nft/presentation/repos/NftRepo';

export default class CollectionViewPageStore {
    nftRepo: NftRepo;
    collectionRepo: CollectionRepo;
    miningFarmRepo: MiningFarmRepo;

    collectionEntity: CollectionEntity;
    miningFarmEntity: MiningFarmEntity;
    nftPreviewsGridState: NftPreviewsGridState;

    constructor(nftRepo: NftRepo, collectionRepo: CollectionRepo, miningFarmRepo: MiningFarmRepo) {
        this.nftRepo = nftRepo;
        this.collectionRepo = collectionRepo;
        this.miningFarmRepo = miningFarmRepo;

        this.collectionEntity = null;
        this.miningFarmEntity = null;
        this.nftPreviewsGridState = new NftPreviewsGridState(this.fetchFunction);

        makeAutoObservable(this);
    }

    async init(collectionId: string) {
        this.nftPreviewsGridState.collectionId = collectionId;
        this.collectionEntity = await this.collectionRepo.fetchCollectionEntity(collectionId);
        this.miningFarmEntity = (await this.miningFarmRepo.fetchMiningFarmsByIds([this.collectionEntity.farmId]))[0];

        const categories = await this.collectionRepo.fetchCategories()
        await this.nftPreviewsGridState.init(categories);
    }

    fetchFunction = async (): Promise < {nftEntities: NftEntity[], total: number, collectionEntities: CollectionEntity[]}> => {
        const { nftEntities, total } = await this.nftRepo.fetchNftsByCollectionIdCategoryAndSearchSortedPaginated(
            this.collectionEntity.id,
            this.nftPreviewsGridState.searchString,
            this.nftPreviewsGridState.getCategoryName(),
            this.nftPreviewsGridState.getSelectedKey(),
            this.nftPreviewsGridState.gridViewState.getFrom(),
            this.nftPreviewsGridState.gridViewState.getItemsPerPage(),
        );

        const collectionIds = nftEntities.map((nftEntity: NftEntity) => nftEntity.collectionId);

        const collectionEntities = await this.collectionRepo.fetchCollectionsByIds(collectionIds);

        return { nftEntities, total, collectionEntities }
    }
}
