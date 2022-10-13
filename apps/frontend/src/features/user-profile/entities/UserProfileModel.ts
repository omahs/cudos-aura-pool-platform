import BigNumber from 'bignumber.js';
import S from '../../../core/utilities/Main';

export default class UserProfileModel {
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

    static fromJson(json): UserProfileModel {
        if (json === null) {
            return null;
        }

        const model = new UserProfileModel();

        model.id = json.id ?? model.id;
        model.name = json.name ?? model.name;
        model.address = json.address ?? model.address;
        model.totalBtcEarned = new BigNumber(json.totalBtcEarned) ?? model.totalBtcEarned;
        model.totalHashPower = Number(json.totalHashPower) ?? model.totalHashPower;
        model.timestampJoined = Number(json.timestampJoined) ?? model.timestampJoined;
        model.profileImgurl = json.profileImgurl ?? model.profileImgurl;
        model.coverImgUrl = json.coverImgUrl ?? model.coverImgUrl;

        return model;
    }

}
