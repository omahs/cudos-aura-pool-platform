// import AbsApi from './AbsApi';
// import StorageHelper from '../../../../core/helpers/StorageHelper';
// import BitcoinDataModel from '../../entities/BitcoinData';

// export default class BitcoiApi extends AbsApi {
//     dataSource: BitcoinDataSource;

//     constructor(dataSource: BitcoinDataSource) {
//         super();

//         this.storageHelper = new BitcoinDataSource();
//     }

//     getBitcoinData(callback: (bitcoinData: BitcoinDataModel) => void) {
//         const bitcoinData = BitcoinDataModel.fromJson(this.storageHelper.bitcoinDataJson);
//         callback(bitcoinData);
//     }
// }
