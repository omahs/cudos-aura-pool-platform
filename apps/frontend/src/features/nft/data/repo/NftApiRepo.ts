import NftEntity from '../../entities/NftEntity';
import NftRepo from '../../presentation/repos/NftRepo';
import NftFilterModel from '../../utilities/NftFilterModel';
import NftApi from '../data-sources/NftApi';

export default class NftApiRepo implements NftRepo {

    nftApi: NftApi;

    constructor() {
        this.nftApi = new NftApi();
    }

    async fetchNftById(nftId: string): Promise < NftEntity > {
        return this.nftApi.fetchNftById(nftId);
    }

    async fetchNewNftDrops(): Promise < NftEntity[] > {
        return this.nftApi.fetchNewNftDrops();
    }

    async fetchTrendingNfts(): Promise < NftEntity[] > {
        return this.nftApi.fetchTrendingNfts();
    }

    async fetchNftsByFilter(nftFilterModel: NftFilterModel): Promise < { nftEntities: NftEntity[], total: number } > {
        return this.nftApi.fetchNftsByFilter(nftFilterModel);
    }
}
