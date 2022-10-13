import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class UserProfileEntity {
    id: string;
    name: string;
    address: string;
    totalBtcEarned: BigNumber;
    totalHashPower: number;
    timestampJoined: number;
    profileImgurl: string;
    coverImgUrl: string;

    constructor() {
        this.id = S.Strings.EMPTY;
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
            'id': this.id,
            'name': this.name,
            'address': this.name,
            'totalBtcEarned': this.totalBtcEarned.toString(),
            'totalHashPower': this.totalHashPower,
            'timestampJoined': this.timestampJoined,
            'profileImgurl': this.profileImgurl,
            'coverImgUrl': this.coverImgUrl,
        }
    }

    static fromJson(json): UserProfileEntity {
        if (json === null) {
            return null;
        }

        const entity = new UserProfileEntity();

        entity.id = json.id ?? entity.id;
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
