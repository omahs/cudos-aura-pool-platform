import AccountStorageRepo from '../../../features/accounts/data/repo/AccountStorageRepo';
import BitcoinStorageRepo from '../../../features/bitcoin-data/data/repo/BitcoinStorageRepo';
import CollectionStorageRepo from '../../../features/collection/data/repo/CollectionStorageRepo';
import CudosStorageRepo from '../../../features/cudos-data/data/repo/CudosStorageRepo';
import MiningFarmStorageRepo from '../../../features/mining-farm/data/repo/MiningFarmStorageRepo';
import NftStorageRepo from '../../../features/nft/data/repo/NftStorageRepo';

export default class RepoStore {

    bitcoinRepo: BitcoinStorageRepo;
    cudosRepo: CudosStorageRepo;
    miningFarmRepo: MiningFarmStorageRepo;
    collectionRepo: CollectionStorageRepo;
    nftRepo: NftStorageRepo;
    accountRepo: AccountStorageRepo;

    constructor(
        bitcoinRepo: BitcoinStorageRepo,
        cudosRepo: CudosStorageRepo,
        miningFarmRepo: MiningFarmStorageRepo,
        collectionRepo: CollectionStorageRepo,
        nftRepo: NftStorageRepo,
        accountRepo: AccountStorageRepo,
    ) {
        this.bitcoinRepo = bitcoinRepo;
        this.cudosRepo = cudosRepo;
        this.miningFarmRepo = miningFarmRepo;
        this.collectionRepo = collectionRepo;
        this.nftRepo = nftRepo;
        this.accountRepo = accountRepo;
    }

}
