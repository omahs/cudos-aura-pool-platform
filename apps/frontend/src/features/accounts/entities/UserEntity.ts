import BigNumber from 'bignumber.js';
import moment from 'moment';

import ProjectUtils from '../../../core/utilities/ProjectUtils';
import S from '../../../core/utilities/Main';

export default class UserEntity {

    userId: string;
    accountId: string;
    name: string;
    address: string;
    totalBtcEarned: BigNumber;
    totalHashPower: number;
    timestampJoined: number;
    profileImgUrl: string;
    coverImgUrl: string;

    constructor() {
        this.userId = S.Strings.NOT_EXISTS;
        this.accountId = S.Strings.NOT_EXISTS;
        this.name = S.Strings.EMPTY;
        this.address = S.Strings.EMPTY;
        this.totalBtcEarned = new BigNumber(S.NOT_EXISTS);
        this.totalHashPower = S.NOT_EXISTS;
        this.timestampJoined = S.NOT_EXISTS;
        this.profileImgUrl = '/assets/temp/profile-preview.png';
        this.coverImgUrl = '/assets/temp/profile-cover.png';
    }

    formatDateJoined(): string {
        return moment(new Date(this.timestampJoined)).format(ProjectUtils.MOMENT_FORMAT_DATE);
    }

    static toJson(entity: UserEntity): any {
        if (entity === null) {
            return null;
        }

        return {
            'userId': entity.userId,
            'accountId': entity.accountId,
            'name': entity.name,
            'address': entity.address,
            'totalBtcEarned': entity.totalBtcEarned.toString(),
            'totalHashPower': entity.totalHashPower,
            'timestampJoined': entity.timestampJoined,
            'profileImgUrl': entity.profileImgUrl,
            'coverImgUrl': entity.coverImgUrl,
        }
    }

    static fromJson(json): UserEntity {
        if (json === null) {
            return null;
        }

        const entity = new UserEntity();

        entity.userId = json.userId ?? entity.userId;
        entity.accountId = json.accountId ?? entity.accountId;
        entity.name = json.name ?? entity.name;
        entity.address = json.address ?? entity.address;
        entity.totalBtcEarned = new BigNumber(json.totalBtcEarned) ?? entity.totalBtcEarned;
        entity.totalHashPower = Number(json.totalHashPower) ?? entity.totalHashPower;
        entity.timestampJoined = Number(json.timestampJoined) ?? entity.timestampJoined;
        entity.profileImgUrl = json.profileImgUrl ?? entity.profileImgUrl;
        entity.coverImgUrl = json.coverImgUrl ?? entity.coverImgUrl;

        return entity;
    }

}
