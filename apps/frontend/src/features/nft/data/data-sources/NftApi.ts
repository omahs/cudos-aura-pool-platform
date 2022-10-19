import NftEntity from '../../entities/NftEntity';
import NftFilterModel from '../../utilities/NftFilterModel';

export default class NftApi {

    async fetchNftById(nftId: string): Promise < NftEntity > {
        return null;
    }

    async fetchNewNftDrops(): Promise < NftEntity[] > {
        return null;
    }

    async fetchTrendingNfts(): Promise < NftEntity[] > {
        return null;
    }

    async fetchNftsByFilter(nftFilterModel: NftFilterModel): Promise < { nftEntities: NftEntity[], total: number } > {
        return null;
    }

}
