import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class UserEntity {

    accountId: string;
    name: string;
    address: string;
    totalBtcEarned: BigNumber;
    totalHashPower: number;
    timestampJoined: number;
    profileImgurl: string;
    coverImgUrl: string;

    constructor() {
        this.accountId = S.Strings.NOT_EXISTS;
        this.name = S.Strings.EMPTY;
        this.address = S.Strings.EMPTY;
        this.totalBtcEarned = new BigNumber(S.NOT_EXISTS);
        this.totalHashPower = S.NOT_EXISTS;
        this.timestampJoined = S.NOT_EXISTS;
        this.profileImgurl = S.Strings.EMPTY;
        this.coverImgUrl = S.Strings.EMPTY;
    }

    toJson(): any {
        return {
            'accountId': this.accountId,
            'name': this.name,
            'address': this.name,
            'totalBtcEarned': this.totalBtcEarned.toString(),
            'totalHashPower': this.totalHashPower,
            'timestampJoined': this.timestampJoined,
            'profileImgurl': this.profileImgurl,
            'coverImgUrl': this.coverImgUrl,
        }
    }

    static fromJson(json): UserEntity {
        if (json === null) {
            return null;
        }

        const entity = new UserEntity();

        entity.accountId = json.accountId ?? entity.accountId;
        entity.name = json.name ?? entity.name;
        entity.address = json.address ?? entity.address;
        entity.totalBtcEarned = new BigNumber(json.totalBtcEarned) ?? entity.totalBtcEarned;
        entity.totalHashPower = Number(json.totalHashPower) ?? entity.totalHashPower;
        entity.timestampJoined = Number(json.timestampJoined) ?? entity.timestampJoined;
        entity.profileImgurl = json.profileImgurl ?? entity.profileImgurl;
        entity.coverImgUrl = json.coverImgUrl ?? entity.coverImgUrl;

        return entity;
    }

}
