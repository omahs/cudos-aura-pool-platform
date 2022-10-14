import BitcoinDataEntity from '../../entities/BitcoinDataEntity';

export default interface BitcoinRepo {

    fetchBitcoinData(): Promise < BitcoinDataEntity >;

}
