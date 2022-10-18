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

    static toJson(entity: UserEntity): any {
        if (entity === null) {
            return null;
        }

        return {
            'accountId': entity.accountId,
            'name': entity.name,
            'address': entity.address,
            'totalBtcEarned': entity.totalBtcEarned.toString(),
            'totalHashPower': entity.totalHashPower,
            'timestampJoined': entity.timestampJoined,
            'profileImgurl': entity.profileImgurl,
            'coverImgUrl': entity.coverImgUrl,
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

    static isEmptyEntity(userEntity: UserEntity): boolean {
        return userEntity !== null
        && userEntity.accountId === S.Strings.NOT_EXISTS
        && userEntity.name === S.Strings.EMPTY
        && userEntity.address === S.Strings.EMPTY
        && userEntity.totalBtcEarned.eq(S.NOT_EXISTS)
        && userEntity.totalHashPower === S.NOT_EXISTS
        && userEntity.timestampJoined === S.NOT_EXISTS
        && userEntity.profileImgurl === S.Strings.EMPTY
        && userEntity.coverImgUrl === S.Strings.EMPTY;
    }

}
