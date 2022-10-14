import S from '../../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';
import CudosRepo from '../../../cudos-data/presentation/repos/CudosRepo';
import NftRepo from '../../../nft/presentation/repos/NftRepo';
import NftEntity, { NftListinStatus } from '../../entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';

export default class NftDetailsStore {

    bitcoinStore: BitcoinStore;

    nftRepo: NftRepo;
    cudosRepo: CudosRepo;

    cudosPrice: number;
    bitcoinPrice: number;
    nftEntity: NftEntity;
    collectionEntity: CollectionEntity;
    miningFarm: MiningFarmEntity;

    constructor(bitcoinStore: BitcoinStore, nftRepo: NftRepo, cudosRepo: CudosRepo) {
        this.bitcoinStore = bitcoinStore;

        this.nftRepo = nftRepo;
        this.cudosRepo = cudosRepo;

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

    async init(nftId: string) {
        await this.bitcoinStore.init();

        // TODO: gt by real id
        this.nftRepo.getNftEntity(nftId, (nftEntity, collectionEntity, miningFarm) => {
            this.nftEntity = nftEntity;
            this.collectionEntity = collectionEntity;
            this.miningFarm = miningFarm;
        });

        this.cudosRepo.getCudosPrice((cudosPrice) => {
            this.cudosPrice = cudosPrice;
        })

        this.bitcoinPrice = this.bitcoinStore.getBitcoinPrice();
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
