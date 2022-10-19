import NftEntity from '../../entities/NftEntity';
import NftFilterModel from '../../utilities/NftFilterModel';

export default interface NftRepo {

    fetchNftById(nftId: string): Promise < NftEntity >;

    fetchNewNftDrops(): Promise < NftEntity[] >;

    fetchTrendingNfts(): Promise < NftEntity[] >;

    fetchNftsByFilter(nftFilterModel: NftFilterModel): Promise < { nftEntities: NftEntity[], total: number } >;
}
