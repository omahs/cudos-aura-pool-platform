export default interface CudosRepo {
    getCudosPrice(callback: (price: number) => void);
}
