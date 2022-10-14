import CudosDataEntity from '../../entities/CudosDataEntity';

export default interface CudosRepo {

    fetchCudosData(): Promise < CudosDataEntity >;
    // getCudosPrice(callback: (price: number) => void);

}
