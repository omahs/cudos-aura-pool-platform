import BitcoinDataEntity from '../../entities/BitcoinDataEntity';

export default interface BitcoinRepo {
    getBitcoinData(callback: (bitcoinData: BitcoinDataEntity) => void);
}
