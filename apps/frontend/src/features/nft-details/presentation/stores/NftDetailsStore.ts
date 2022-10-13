import S from '../../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';
import CudosRepo from '../../../cudos-data/presentation/repos/CudosRepo';
import NftRepo from '../../../nfts-explore/presentation/repos/NftRepo';
import NftProfile from '../../entities/NftProfile';
import CollectionProfile from '../../../collections-marketplace/entities/CollectionProfile';
import MiningFarmModel from '../../../mining-farm/entities/MiningFarmModel';
import BitcoinRepo from '../../../bitcoin-data/presentation/repos/BitcoinRepo';

export default class NftDetailsStore {
    nftRepo: NftRepo;
    cudosRepo: CudosRepo;
    bitcoinRepo: BitcoinRepo;

    cudosPrice: number;
    bitcoinPrice: number;
    nftProfile: NftProfile;
    collectionProfile: CollectionProfile;
    miningFarm: MiningFarmModel;

    constructor(nftRepo: NftRepo, cudosRepo: CudosRepo, bitcoinRepo: BitcoinRepo) {
        this.nftRepo = nftRepo;
        this.cudosRepo = cudosRepo;
        this.bitcoinRepo = bitcoinRepo;

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults() {
        this.cudosPrice = S.NOT_EXISTS;
        this.bitcoinPrice = S.NOT_EXISTS;
        this.nftProfile = null;
        this.collectionProfile = null;
        this.miningFarm = null;
    }

    innitiate(nftId: string) {
        // TODO: gt by real id
        this.nftRepo.getNftProfile(nftId, (nftProfile, collectionProfile, miningFarm) => {
            this.nftProfile = nftProfile;
            this.collectionProfile = collectionProfile;
            this.miningFarm = miningFarm;
        });

        this.cudosRepo.getCudosPrice((cudosPrice) => {
            this.cudosPrice = cudosPrice;
        })

        this.bitcoinRepo.getBitcoinData((data) => {
            this.bitcoinPrice = data.price;
        })
    }

}
