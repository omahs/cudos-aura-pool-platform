import StorageHelper from '../../../../core/helpers/StorageHelper';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmRepo from '../../presentation/repos/MiningFarmRepo';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';

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

    async fetchMiningFarmsByFilter(miningFarmFilterModel: MiningFarmFilterModel): Promise < {miningFarmEntities: MiningFarmEntity[], total: number} > {
        let miningFarmsSlice = this.storageHelper.collectionsJson.map((json) => MiningFarmEntity.fromJson(json));

        if (miningFarmFilterModel.searchString !== '') {
            miningFarmsSlice = miningFarmsSlice.filter((json) => {
                return json.name.toLowerCase().indexOf(miningFarmFilterModel.searchString) !== -1;
            });
        }

        miningFarmsSlice = miningFarmsSlice.sort((a: MiningFarmEntity, b: MiningFarmEntity) => {
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
}
