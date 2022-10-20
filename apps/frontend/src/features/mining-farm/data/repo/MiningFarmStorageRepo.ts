import S from '../../../../core/utilities/Main';
import StorageHelper from '../../../../core/helpers/StorageHelper';
import MiningFarmEntity, { MiningFarmStatus } from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';
import MiningFarmFilterModel, { MiningFarmHashPowerFilter } from '../../utilities/MiningFarmFilterModel';

export default class MiningFarmStorageRepo implements MiningFarmRepo {

    storageHelper: StorageHelper;

    constructor(storageHelper: StorageHelper) {
        this.storageHelper = storageHelper;
    }

    async fetchAllMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.storageHelper.miningFarmsJson.map((json: any) => MiningFarmEntity.fromJson(json));
    }

    async fetchPopularMiningFarms(): Promise < MiningFarmEntity[] > {
        return this.storageHelper.miningFarmsJson.slice(0, 3).map((json: any) => MiningFarmEntity.fromJson(json));
    }

    async fetchMiningFarmsByIds(miningFarmIds: string[]): Promise < MiningFarmEntity[] > {
        const farmsJson = this.storageHelper.miningFarmsJson.filter((json: any) => miningFarmIds.includes(json.id));
        return farmsJson.map((farmJson) => MiningFarmEntity.fromJson(farmJson));
    }

    async fetchMiningFarmById(miningFarmId: string): Promise < MiningFarmEntity > {
        const miningFarmEntities = await this.fetchMiningFarmsByIds([miningFarmId]);
        return miningFarmEntities.length === 1 ? miningFarmEntities[0] : null;
    }

    async fetchMiningFarmByAccountId(accountId: string): Promise < MiningFarmEntity > {
        const farmJson = this.storageHelper.miningFarmsJson.find((json: any) => json.accountId === accountId);

        if (farmJson === undefined) {
            return null;
        }

        return MiningFarmEntity.fromJson(farmJson);
    }

    async fetchMiningFarmsByFilter(miningFarmFilterModel: MiningFarmFilterModel): Promise < {miningFarmEntities: MiningFarmEntity[], total: number} > {
        let miningFarmsSlice = this.storageHelper.miningFarmsJson.map((json) => MiningFarmEntity.fromJson(json));

        if (miningFarmFilterModel.searchString !== '') {
            miningFarmsSlice = miningFarmsSlice.filter((json) => {
                return json.name.toLowerCase().indexOf(miningFarmFilterModel.searchString) !== -1;
            });
        }

        if (miningFarmFilterModel.hashPowerFilter !== MiningFarmHashPowerFilter.NONE) {
            let hashPowerLimit = S.NOT_EXISTS;
            switch (miningFarmFilterModel.hashPowerFilter) {
                case MiningFarmHashPowerFilter.BELOW_1000_EH:
                    hashPowerLimit = 1000;
                    break;
                case MiningFarmHashPowerFilter.BELOW_2000_EH:
                    hashPowerLimit = 2000;
                    break;
                case MiningFarmHashPowerFilter.ABOVE_2000_EH:
                default:
                    hashPowerLimit = Number.MAX_SAFE_INTEGER;
                    break;

            }

            miningFarmsSlice = miningFarmsSlice.filter((json) => {
                return json.hashRateTh <= hashPowerLimit;
            });
        }

        miningFarmsSlice = miningFarmsSlice.filter((json) => {
            return json.status === miningFarmFilterModel.status;
        });

        miningFarmsSlice.sort((a: MiningFarmEntity, b: MiningFarmEntity) => {
            switch (miningFarmFilterModel.sortKey) {
                case MiningFarmFilterModel.SORT_KEY_POPULAR:
                    // TODO: what does popular farm mean, how to compare?
                    return a.name.localeCompare(b.name)
                case MiningFarmFilterModel.SORT_KEY_NAME:
                default:
                    return a.name.localeCompare(b.name)
            }
        });

        return {
            miningFarmEntities: miningFarmsSlice.slice(miningFarmFilterModel.from, miningFarmFilterModel.from + miningFarmFilterModel.count),
            total: miningFarmsSlice.length,
        }
    }

    async editMiningFarm(miningFarmEntity: MiningFarmEntity): Promise < void > {
        const farmsJson = this.storageHelper.miningFarmsJson.filter((json) => json.id !== miningFarmEntity.id);

        farmsJson.push(miningFarmEntity.toJson());

        this.storageHelper.miningFarmsJson = farmsJson;

        this.storageHelper.save();
    }

    async approveFarms(miningFarmIds: string[]): Promise < void > {
        const miningFarmJsons = this.storageHelper.miningFarmsJson;

        miningFarmIds.forEach((id) => {
            miningFarmJsons.find((json) => json.id === id).status = MiningFarmStatus.APPROVED;
        })

        this.storageHelper.miningFarmsJson = miningFarmJsons;
        this.storageHelper.save();
    }

}
