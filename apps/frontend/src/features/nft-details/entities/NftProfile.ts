import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class NftProfile {
    id: string;
    name: string;
    category: string;
    collectionId: string;
    hashPower: number;
    price: BigNumber;
    imageUrl: string;
    listingStatus: number;
    expiryDate: number;
    creatorAddress: string;
    currentOwnerAddress: string;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.collectionId = S.Strings.EMPTY;
        this.hashPower = S.NOT_EXISTS;
        this.price = new BigNumber(S.NOT_EXISTS);
        this.imageUrl = S.Strings.EMPTY;
        this.listingStatus = S.NOT_EXISTS;
        this.expiryDate = S.NOT_EXISTS;
        this.creatorAddress = S.Strings.EMPTY
        this.currentOwnerAddress = S.Strings.EMPTY
    }

    toJson(): any {
        return {
            'id': this.id,
            'name': this.name,
            'category': this.category,
            'collectionId': this.collectionId,
            'hashPower': this.hashPower,
            'price': this.price,
            'imageUrl': this.imageUrl,
            'listingStatus': this.listingStatus,
            'expiryDate': this.expiryDate,
            'creatorAddress': this.creatorAddress,
            'currentOwnerAddress': this.currentOwnerAddress,
        }
    }

    static fromJson(json): NftProfile {
        if (json === null) {
            return null;
        }

        const model = new NftProfile();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.category = json.category ?? model.category;
        model.collectionId = json.collectionId ?? model.collectionId;
        model.hashPower = Number(json.hashPower) ?? model.hashPower;
        model.price = new BigNumber(json.price) ?? model.price;
        model.imageUrl = json.imageUrl ?? model.imageUrl;
        model.listingStatus = Number(json.listingStatus) ?? model.listingStatus;
        model.expiryDate = Number(json.expiryDate) ?? model.expiryDate;
        model.creatorAddress = json.creatorAddress ?? model.creatorAddress;
        model.currentOwnerAddress = json.currentOwnerAddress ?? model.currentOwnerAddress;

        return model;
    }

    getExpiryDisplay(): string {
        const periodMilis = this.expiryDate - Date.now();

        if (periodMilis < 0) {
            return 'Expired';
        }

        let delta = periodMilis / 1000;
        const hour = 3600; // 3600 seconds
        const day = 24 * hour // 24 hours
        const year = day * 365 // 365 days

        const years = Math.floor(delta / year);
        delta -= years * year;

        // calculate (and subtract) whole days
        const days = Math.floor(delta / day);
        delta -= days * day;

        // calculate (and subtract) whole hours
        const hours = Math.floor(delta / hour) % 24;
        delta -= hours * hour;

        return `${years} years, ${days} days, ${hours} hours`;
    }

}
