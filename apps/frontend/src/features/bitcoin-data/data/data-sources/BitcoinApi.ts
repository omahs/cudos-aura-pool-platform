// import AbsApi from './AbsApi';
// import StorageHelper from '../../../../core/helpers/StorageHelper';
// import BitcoinDataEntity from '../../entities/BitcoinDataEntity';

// export default class BitcoiApi extends AbsApi {
//     dataSource: BitcoinDataSource;

//     constructor(dataSource: BitcoinDataSource) {
//         super();

//         this.storageHelper = new BitcoinDataSource();
//     }

//     getBitcoinData(callback: (bitcoinData: BitcoinDataEntity) => void) {
//         const bitcoinData = BitcoinDataEntity.fromJson(this.storageHelper.bitcoinDataJson);
//         callback(bitcoinData);
//     }
// }
