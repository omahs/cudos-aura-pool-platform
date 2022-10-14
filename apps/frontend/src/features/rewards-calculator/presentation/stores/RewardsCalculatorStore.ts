import { makeAutoObservable } from 'mobx';

import MiningFarmEntity from '../../../mining-farm-view/entities/MiningFarmEntity';

import S from '../../../../core/utilities/Main';
import BigNumber from 'bignumber.js';
import BitcoinDataEntity from '../../../bitcoin-data/entities/BitcoinDataEntity';
import MiningFarmRepo from '../../../mining-farm-view/presentation/repos/MiningFarmRepo';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';

export default class RewardsCalculatorStore {

    bitcoinStore: BitcoinStore;
    miningFarmRepo: MiningFarmRepo;

    miningFarms: MiningFarmEntity[];
    selectedFarmIndex: number;

    networkDifficultyEdit: string;
    hashRateTh: number;

    constructor(bitcoinStore: BitcoinStore, miningFarmRepo: MiningFarmRepo) {
        this.bitcoinStore = bitcoinStore;
        this.miningFarmRepo = miningFarmRepo;

        this.miningFarms = [];
        this.selectedFarmIndex = S.NOT_EXISTS;

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.networkDifficultyEdit = S.Strings.EMPTY;
        this.hashRateTh = 0;
    }

    async init() {
        await this.bitcoinStore.init();

        this.resetDefaults();
        this.getFarmPools();
    }

    hasNetworkDifficulty() {
        return this.networkDifficultyEdit !== S.Strings.EMPTY;
    }

    getFarmPools() {
        this.miningFarmRepo.getAllFarmgs((miningFarms: MiningFarmEntity[]) => {
            this.miningFarms = miningFarms;
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
        return btcAmount.multipliedBy(this.bitcoinStore.getBitcoinPrice());
    }

    getSelectedFarmName(): string {
        return this.miningFarms[this.selectedFarmIndex]?.name ?? S.Strings.EMPTY;
    }

    getNetworkDifficulty() {
        if (this.hasNetworkDifficulty() === true) {
            return this.networkDifficultyEdit;
        }

        return this.bitcoinStore.getNetworkDifficulty();
    }

    getPriceChangeFormated(): string {
        const priceChange = this.bitcoinStore.getBitcoinPriceChange();

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

        return `${powerConsumptionPerTh * hashRate} W`;
    }

    getBlockRewardDisplay(): string {
        const blockReward = this.bitcoinStore.getBlockReward();
        return blockReward === S.Strings.EMPTY ? '-' : `${(new BigNumber(blockReward)).toFixed(2)} BTC`;
    }

}
