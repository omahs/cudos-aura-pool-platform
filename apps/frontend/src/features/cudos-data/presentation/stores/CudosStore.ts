import CudosDataEntity from '../../entities/CudosDataEntity';
import CudosRepo from '../repos/CudosRepo';

export default class CudosStore {

    cudosRepo: CudosRepo;

    inited: boolean;
    cudostDataEntity: CudosDataEntity;

    constructor(cudosRepo: CudosRepo) {
        this.cudosRepo = cudosRepo;

        this.inited = false;
        this.cudostDataEntity = null;
    }

    async init() {
        if (this.inited === true) {
            return;
        }

        this.inited = true;
        this.cudostDataEntity = await this.cudosRepo.fetchCudosData();
    }

    getCudosPrice(): number {
        return this.cudostDataEntity?.price ?? 0;
    }

    getBitcoinPriceChange(): number {
        return this.cudostDataEntity?.priceChange ?? 0;
    }

}
