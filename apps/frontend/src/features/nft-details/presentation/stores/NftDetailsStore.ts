import S from '../../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';
import CudosRepo from '../../../cudos-data/presentation/repos/CudosRepo';
import NftRepo from '../../../nfts-explore/presentation/repos/NftRepo';
import NftEntity, { NftListinStatus } from '../../entities/NftEntity';
import CollectionEntity from '../../../collections-marketplace/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import BitcoinRepo from '../../../bitcoin-data/presentation/repos/BitcoinRepo';

export default class NftDetailsStore {
    nftRepo: NftRepo;
    cudosRepo: CudosRepo;
    bitcoinRepo: BitcoinRepo;

    cudosPrice: number;
    bitcoinPrice: number;
    nftEntity: NftEntity;
    collectionEntity: CollectionEntity;
    miningFarm: MiningFarmEntity;

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
        this.nftEntity = null;
        this.collectionEntity = null;
        this.miningFarm = null;
    }

    init(nftId: string) {
        // TODO: gt by real id
        this.nftRepo.getNftEntity(nftId, (nftEntity, collectionEntity, miningFarm) => {
            this.nftEntity = nftEntity;
            this.collectionEntity = collectionEntity;
            this.miningFarm = miningFarm;
        });

        this.cudosRepo.getCudosPrice((cudosPrice) => {
            this.cudosPrice = cudosPrice;
        })

        this.bitcoinRepo.getBitcoinData((data) => {
            this.bitcoinPrice = data.price;
        })
    }

    getNftPriceText() {
        if (this.isNftListed() === false) {
            return 'Not for sale';
        }

        return `${this.nftEntity.price.multipliedBy(this.cudosPrice).toFixed(2)}`;
    }

    isNftListed() {
        return this.nftEntity.listingStatus === NftListinStatus.LISTED;
    }

    isOwner(address: string) {
        return this.nftEntity.currentOwnerAddress === address;
    }
}
