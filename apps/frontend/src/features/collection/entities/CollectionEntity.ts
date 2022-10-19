import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export enum CollectionStatus {
    NOT_SUBMITTED = 'not_submitted',
    QUEUED = 'queued',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    ISSUED = 'issued',
    DELETED = 'deleted',
}

export default class CollectionEntity {
    id: string;
    farmId: string;
    name: string;
    description: string;
    ownerAddress: string;
    hashPower: number;
    price: BigNumber;
    volume: BigNumber;
    items: number;
    owners: number;
    profileImgUrl: string;
    coverImgUrl: string;
    status: CollectionStatus;

    constructor() {
        this.id = S.Strings.EMPTY;
        this.farmId = S.Strings.EMPTY;
        this.name = S.Strings.EMPTY;
        this.description = S.Strings.EMPTY;
        this.ownerAddress = S.Strings.EMPTY;
        this.hashPower = S.NOT_EXISTS;
        this.price = new BigNumber(S.NOT_EXISTS);
        this.volume = new BigNumber(S.NOT_EXISTS);
        this.items = S.NOT_EXISTS;
        this.owners = S.NOT_EXISTS;
        this.profileImgUrl = S.Strings.EMPTY;
        this.coverImgUrl = S.Strings.EMPTY;
        this.status = CollectionStatus.NOT_SUBMITTED;
    }

    toJson(): any {
        return {
            'id': this.id,
            'farmId': this.farmId,
            'name': this.name,
            'description': this.description,
            'ownerAddress': this.description,
            'hashPower': this.hashPower,
            'price': this.price,
            'volume': this.volume,
            'items': this.volume,
            'owners': this.volume,
            'profileImgUrl': this.profileImgUrl,
            'coverImgUrl': this.coverImgUrl,
            'status': this.status,
        }
    }

    static fromJson(json): CollectionEntity {
        if (json === null) {
            return null;
        }

        const model = new CollectionEntity();

        model.id = json.id ?? model.id;
        model.farmId = json.farmId ?? model.farmId;
        model.name = json.name ?? model.name;
        model.description = json.description ?? model.description;
        model.ownerAddress = json.ownerAddress ?? model.ownerAddress;
        model.hashPower = Number(json.hashPower) ?? model.hashPower;
        model.price = new BigNumber(json.price) ?? model.price;
        model.volume = new BigNumber(json.volume) ?? model.volume;
        model.items = Number(json.items) ?? model.items;
        model.owners = Number(json.owners) ?? model.owners;

        model.profileImgUrl = json.profileImgUrl ?? model.profileImgUrl;
        model.coverImgUrl = json.coverImgUrl ?? model.coverImgUrl;
        model.status = json.status ?? model.status;

        return model;
    }

    hashRateDisplay(): string {
        // TODO: calculate EH or TH or w/e

        return `${this.hashPower} EH/s`
    }

    priceDisplay(): string {
        // TODO: calculate K or M or w/e

        return `${this.price.toFixed(0)}K CUDOS`
    }

    priceUsdDisplay(cudosInUsd: number) {
        // TODO calculate M or B or w/e

        return `$${this.price.multipliedBy(cudosInUsd).toFixed(1)}K`
    }
}
