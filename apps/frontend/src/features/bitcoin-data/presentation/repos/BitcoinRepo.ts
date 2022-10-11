import BitcoinDataModel from '../../entities/BitcoinData';

export default interface BitcoinRepo {
    getBitcoinData(callback: (bitcoinData: BitcoinDataModel) => void);
}
