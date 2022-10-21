import S from '../../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../repos/CollectionRepo';
import BigNumber from 'bignumber.js';
import NftEntity from '../../../nft/entities/NftEntity';
import NftRepo from '../../../nft/presentation/repos/NftRepo';
import NftFilterModel from '../../../nft/utilities/NftFilterModel';

export default class CreditCollectionNftsPageStore {
    accountSessionStore: AccountSessionStore;
    collectionRepo: CollectionRepo;
    nftRepo: NftRepo;

    collectionEntity: CollectionEntity;
    nftEntities: NftEntity[];
    selectedNftEntity: NftEntity;

    defaultHashAndPriceValues: number;
    hashPowerPerNft: number;
    pricePerNft: number;

    constructor(accountSessionStore: AccountSessionStore, collectionRepo: CollectionRepo, nftRepo: NftRepo) {
        this.accountSessionStore = accountSessionStore;
        this.collectionRepo = collectionRepo;
        this.nftRepo = nftRepo;

        this.nullate();

        makeAutoObservable(this);
    }

    init = async (collectionId: string) => {
        this.nullate();

        this.fetch(collectionId);
    }

    nullate() {
        this.collectionEntity = null;
        this.nftEntities = [];
        this.selectedNftEntity = null;

        this.defaultHashAndPriceValues = S.INT_FALSE;
        this.hashPowerPerNft = S.NOT_EXISTS;
        this.pricePerNft = S.NOT_EXISTS;
    }

    async fetch(collectionId: string) {
        this.collectionEntity = await this.collectionRepo.fetchCollectionById(collectionId);
        const nftFilter = new NftFilterModel();
        nftFilter.collectionId = collectionId;
        nftFilter.count = Number.MAX_SAFE_INTEGER;

        const { nftEntities } = await this.nftRepo.fetchNftsByFilter(nftFilter);
        this.nftEntities = nftEntities;

        this.selectedNftEntity = this.initNewNftEntity();
    }

    initNewNftEntity(): NftEntity {
        const nftEntity = new NftEntity();

        nftEntity.farmRoyalties = this.collectionEntity.royalties;
        nftEntity.maintenanceFee = this.collectionEntity.maintenanceFees;

        return nftEntity;
    }

    isSelectedNftImageEmpty(): boolean {
        return this.selectedNftEntity.imageUrl === S.Strings.EMPTY
    }

    isProfilePictureEmpty(): boolean {
        return this.collectionEntity.profileImgUrl === S.Strings.EMPTY
    }

    isCoverPictureEmpty(): boolean {
        return this.collectionEntity.coverImgUrl === S.Strings.EMPTY
    }

    onChangeCollectionName = (name: string) => {
        this.collectionEntity.name = name;
    }

    onChangeCollectionDescription = (description: string) => {
        this.collectionEntity.description = description;
    }

    onChangeCollectionRoyalties = (royalties: string) => {
        this.collectionEntity.royalties = Number(royalties);
    }

    onChangeMaintenanceFees = (maintenanceFees: string) => {
        this.collectionEntity.maintenanceFees = new BigNumber(maintenanceFees);
    }

    onChangeCollectionPayoutAddress = (payoutAddress: string) => {
        this.collectionEntity.payoutAddress = payoutAddress;
    }

    onChangeAcceptDefaultHashPowerCheckboxValue = () => {
        const newValue = this.defaultHashAndPriceValues === S.INT_FALSE ? S.INT_TRUE : S.INT_FALSE;
        this.defaultHashAndPriceValues = newValue;
    }

    onChangeHashPowerPerNft = (hashPowerPerNft: string) => {
        this.hashPowerPerNft = Number(hashPowerPerNft);
    }

    onChangePricePerNft = (pricePerNft: string) => {
        this.pricePerNft = Number(pricePerNft);
    }

    onChangeSelectedNftName = (nftName: string) => {
        this.selectedNftEntity.name = nftName;
    }

    onChangeSelectedNftRoyalties = (royalties: string) => {
        this.selectedNftEntity.farmRoyalties = Number(royalties);
    }

    onChangeSelectedNftMaintenanceFee() {
        if (this.selectedNftEntity.maintenanceFee.eq(new BigNumber(S.NOT_EXISTS))) {
            return ''
        }

        return this.selectedNftEntity.maintenanceFee.toString();
    }

    onChangeSelectedNftExpirationDate = (expirationDate: string) => {
        // TODO: parse date
        this.selectedNftEntity.expiryDate = Date.now();
    }

    onClickAddToCollection = () => {
        this.nftEntities.push(this.selectedNftEntity);
        this.selectedNftEntity = this.initNewNftEntity();
    }

    getHashPowerPerNft() {
        if (this.hashPowerPerNft === S.NOT_EXISTS) {
            return ''
        }

        return this.hashPowerPerNft.toString();
    }

    getPricePerNft() {
        if (this.pricePerNft === S.NOT_EXISTS) {
            return ''
        }

        return this.pricePerNft.toString();
    }

    getSelectedNftMaintenanceFeeInputValue() {
        if (this.selectedNftEntity.maintenanceFee.eq(new BigNumber(S.NOT_EXISTS))) {
            return ''
        }

        return this.selectedNftEntity.maintenanceFee.toString();
    }

    getCollectionRoyaltiesInputValue() {
        if (this.collectionEntity.royalties === S.NOT_EXISTS) {
            return ''
        }

        return this.collectionEntity.royalties.toString();
    }

    getCollectionMaintenanceFeesInputValue() {
        if (this.collectionEntity.maintenanceFees.eq(new BigNumber(S.NOT_EXISTS))) {
            return ''
        }

        return this.collectionEntity.maintenanceFees.toString();
    }

    getSelectedNftRoyaltiesInputValue() {
        if (this.selectedNftEntity.farmRoyalties === S.NOT_EXISTS) {
            return ''
        }

        return this.selectedNftEntity.farmRoyalties.toString();
    }

    getSelectedNftExpirationDateDisplay() {
        return new Date(this.selectedNftEntity.expiryDate);
    }
}
