import S from '../../../../core/utilities/Main';
import { makeAutoObservable } from 'mobx';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../repos/CollectionRepo';
import BigNumber from 'bignumber.js';

export default class CreditCollectionNftsPageStore {
    accountSessionStore: AccountSessionStore;
    collectionRepo: CollectionRepo

    collectionEntity: CollectionEntity;
    defaultHashAndPriceValues: number;
    hashPowerPerNft: number;
    pricePerNft: number;

    constructor(accountSessionStore: AccountSessionStore, collectionRepo: CollectionRepo) {
        this.accountSessionStore = accountSessionStore;
        this.collectionRepo = collectionRepo;

        this.collectionEntity = null;
        this.defaultHashAndPriceValues = S.INT_FALSE;
        this.hashPowerPerNft = S.NOT_EXISTS;
        this.pricePerNft = S.NOT_EXISTS;

        makeAutoObservable(this);
    }

    async fetch(collectionId: string) {
        const collectionEntity = await this.collectionRepo.fetchCollectionById(collectionId);
        this.collectionEntity = collectionEntity;
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
}
