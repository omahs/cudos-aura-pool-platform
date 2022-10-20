import AccountRepo from '../../../features/accounts/presentation/repos/AccountRepo';
import BitcoinRepo from '../../../features/bitcoin-data/presentation/repos/BitcoinRepo';
import CollectionRepo from '../../../features/collection/presentation/repos/CollectionRepo';
import CudosRepo from '../../../features/cudos-data/presentation/repos/CudosRepo';
import MiningFarmRepo from '../../../features/mining-farm/presentation/repos/MiningFarmRepo';
import NftRepo from '../../../features/nft/presentation/repos/NftRepo';

export default class RepoStore {

    bitcoinRepo: BitcoinRepo;
    cudosRepo: CudosRepo;
    miningFarmRepo: MiningFarmRepo;
    collectionRepo: CollectionRepo;
    nftRepo: NftRepo;
    accountRepo: AccountRepo;

    constructor(
        bitcoinRepo: BitcoinRepo,
        cudosRepo: CudosRepo,
        miningFarmRepo: MiningFarmRepo,
        collectionRepo: CollectionRepo,
        nftRepo: NftRepo,
        accountRepo: AccountRepo,
    ) {
        this.bitcoinRepo = bitcoinRepo;
        this.cudosRepo = cudosRepo;
        this.miningFarmRepo = miningFarmRepo;
        this.collectionRepo = collectionRepo;
        this.nftRepo = nftRepo;
        this.accountRepo = accountRepo;
    }

}
