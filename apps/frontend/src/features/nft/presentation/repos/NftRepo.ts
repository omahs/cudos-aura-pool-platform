import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import NftEntity from '../../entities/NftEntity';
import NftFilterModel from '../../utilities/NftFilterModel';

export default interface NftRepo {

    fetchNftById(nftId: string): Promise < { nftEntity: NftEntity, collectionEntity: CollectionEntity, miningFarmEntity: MiningFarmEntity } >;

    fetchNewNftDrops(): Promise < NftEntity[] >;

    fetchTrendingNfts(): Promise < NftEntity[] >;

    fetchNftsByFilter(nftFilterModel: NftFilterModel): Promise < { nftEntities: NftEntity[], total: number } >;
}
