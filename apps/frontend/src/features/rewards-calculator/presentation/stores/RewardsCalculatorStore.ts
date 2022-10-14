import { makeAutoObservable } from 'mobx';

import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';

import S from '../../../../core/utilities/Main';
import BigNumber from 'bignumber.js';
import BitcoinRepo from '../../../bitcoin-data/presentation/repos/BitcoinRepo';
import BitcoinDataEntity from '../../../bitcoin-data/entities/BitcoinDataEntity';
import MiningFarmRepo from '../../../mining-farm-view/presentation/repos/MiningFarmRepo';

export default class RewardsCalculatorStore {

    miningFarms: MiningFarmEntity[];
    selectedFarmIndex: number;

    bitcoinDataModel: BitcoinDataEntity;

    networkDifficultyEdit: string;
    hashRateTh: number;

    miningFarmRepo: MiningFarmRepo;
    bitcoinRepo: BitcoinRepo;

    constructor(bitcoinRepo: BitcoinRepo, miningFarmRepo: MiningFarmRepo) {
        this.miningFarms = [];
        this.selectedFarmIndex = S.NOT_EXISTS;
        this.bitcoinDataModel = null;

        this.resetDefaults();

        this.miningFarmRepo = miningFarmRepo
        this.bitcoinRepo = bitcoinRepo

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.networkDifficultyEdit = S.Strings.EMPTY;
        this.hashRateTh = 0;
    }

    innitialLoad() {
        this.resetDefaults();
        this.getFarmPools();
        this.getBitcoinData();
    }

    hasNetworkDifficulty() {
        return this.networkDifficultyEdit !== S.Strings.EMPTY;
    }

    getFarmPools() {
        this.miningFarmRepo.getAllFarmgs((miningFarms: MiningFarmEntity[]) => {
            this.miningFarms = miningFarms;
        });
    }

    getBitcoinData() {
        this.bitcoinRepo.getBitcoinData((bitcoinDataModel: BitcoinDataEntity) => {
            this.bitcoinDataModel = bitcoinDataModel;
        });
    }

    onEditNetworkDifficulty = (input: string) => {
        this.networkDifficultyEdit = input;
    }

    onChangeHashRate = (input: string) => {
        this.hashRateTh = Number(input);
    }

    onChangeHashRateSlider = (event: MouseEvent, value: number) => {
        this.hashRateTh = value;
    }

    selectFarmPool = (index: any) => {
        this.selectedFarmIndex = index.value;
    }

    calculatePowerConsumption(): number {
        return this.miningFarms[this.selectedFarmIndex].powerConsumptionPerTh * this.hashRateTh;
    }

    calculateMonthlyRewardBtc(): BigNumber {
        // TODO: calculate
        return new BigNumber(1);
    }

    calculateBtcToUsd(btcAmount: BigNumber): BigNumber {
        return btcAmount.multipliedBy(this.bitcoinDataModel.price);
    }

    getSelectedFarmName(): string {
        return this.miningFarms[this.selectedFarmIndex]?.name ?? S.Strings.EMPTY;
    }

    getNetworkDifficulty() {
        if (this.hasNetworkDifficulty() === true) {
            return this.networkDifficultyEdit;
        }

        return this.bitcoinDataModel?.networkDifficulty ?? S.Strings.EMPTY;
    }

    getPriceChangeFormated(): string {
        let priceChange = this.bitcoinDataModel ? this.bitcoinDataModel.priceChange : 0;
        priceChange = priceChange === S.NOT_EXISTS ? 0 : priceChange;

        const sign = priceChange >= 0 ? '+' : '-';

        return `${sign} ${priceChange.toFixed(2)}%`;
    }

    getPowerCostDisplay(): string {
        const powerCost = this.selectedFarmIndex !== S.NOT_EXISTS
            && this.miningFarms[this.selectedFarmIndex] !== null
            ? this.miningFarms[this.selectedFarmIndex].powerCost
            : S.NOT_EXISTS;

        const result = powerCost === S.NOT_EXISTS ? '-' : `$ ${powerCost.toFixed(2)} kW/h`;

        return result;
    }

    getPoolFeeDisplay(): string {
        const poolFee = this.selectedFarmIndex !== S.NOT_EXISTS
            && this.miningFarms[this.selectedFarmIndex] !== null
            ? this.miningFarms[this.selectedFarmIndex].poolFee
            : S.NOT_EXISTS;

        const result = poolFee === S.NOT_EXISTS ? '-' : `${poolFee}%`;

        return result;
    }

    getPowerConsumptionDisplay(): string {
        const powerConsumptionPerTh = this.selectedFarmIndex !== S.NOT_EXISTS
            && this.miningFarms[this.selectedFarmIndex] !== null
            ? this.miningFarms[this.selectedFarmIndex].powerConsumptionPerTh
            : 0;

        const hashRate = this.hashRateTh === S.NOT_EXISTS ? 0 : this.hashRateTh;

        const result = `${powerConsumptionPerTh * hashRate} W`;

        return result;
    }

    getBlockRewardDisplay(): string {
        const blockRewardString = this.bitcoinDataModel
            && this.bitcoinDataModel.blockReward !== S.Strings.EMPTY
            ? this.bitcoinDataModel.blockReward
            : S.Strings.EMPTY;

        const result = blockRewardString === S.Strings.EMPTY ? '-' : `${(new BigNumber(blockRewardString)).toFixed(2)} BTC`;

        return result;
    }

}
