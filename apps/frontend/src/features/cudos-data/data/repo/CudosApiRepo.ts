import CudosDataEntity from '../../entities/CudosDataEntity';
import CudosRepo from '../../presentation/repos/CudosRepo';
import CudosApi from '../data-sources/CudosApi';

export default class CudosApiRepo implements CudosRepo {

    cudosApi: CudosApi;

    constructor() {
        this.cudosApi = new CudosApi();
    }

    async fetchCudosData(): Promise < CudosDataEntity > {
        return this.cudosApi.fetchCudosData();
    }

}
