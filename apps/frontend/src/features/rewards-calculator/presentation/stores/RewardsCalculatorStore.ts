import { makeAutoObservable } from 'mobx';

import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';

import S from '../../../../core/utilities/Main';
import BigNumber from 'bignumber.js';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';

export default class RewardsCalculatorStore {

    bitcoinStore: BitcoinStore;
    miningFarmRepo: MiningFarmRepo;

    miningFarms: MiningFarmEntity[];
    selectedFarmId: string;

    networkDifficultyEdit: string;
    hashRateTh: number;

    constructor(bitcoinStore: BitcoinStore, miningFarmRepo: MiningFarmRepo) {
        this.bitcoinStore = bitcoinStore;
        this.miningFarmRepo = miningFarmRepo;

        this.miningFarms = [];

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults() {
        this.selectedFarmId = S.Strings.NOT_EXISTS;
        this.networkDifficultyEdit = S.Strings.EMPTY;
        this.hashRateTh = 0;
    }

    isDefault() {
        if (this.selectedFarmId !== S.Strings.NOT_EXISTS) {
            return false;
        }

        if (this.networkDifficultyEdit !== S.Strings.EMPTY) {
            return false;
        }

        if (this.hashRateTh !== 0) {
            return false;
        }

        return true;
    }

    async init() {
        await this.bitcoinStore.init();

        this.resetDefaults();
        this.miningFarms = await this.miningFarmRepo.fetchAllMiningFarms();
    }

    hasNetworkDifficulty() {
        return this.networkDifficultyEdit !== S.Strings.EMPTY;
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

    selectFarmPool = (miningFarmId: string) => {
        this.selectedFarmId = miningFarmId;
    }

    calculatePowerConsumption(): number {
        return this.miningFarms[this.selectedFarmId].powerConsumptionPerTh * this.hashRateTh;
    }

    calculateMonthlyRewardBtc(): BigNumber {
        // TODO: calculate
        return new BigNumber(1);
    }

    calculateBtcToUsd(btcAmount: BigNumber): BigNumber {
        return btcAmount.multipliedBy(this.bitcoinStore.getBitcoinPrice());
    }

    getSelectedFarmName(): string {
        return this.miningFarms[this.selectedFarmId]?.name ?? S.Strings.EMPTY;
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
        let powerCost;
        if (this.selectedFarmId !== S.Strings.NOT_EXISTS) {
            powerCost = this.miningFarms[this.selectedFarmId]?.powerCost ?? S.NOT_EXISTS;
        } else {
            powerCost = S.NOT_EXISTS;
        }

        return powerCost === S.NOT_EXISTS ? '-' : `$ ${powerCost.toFixed(2)} kW/h`;
    }

    getPoolFeeDisplay(): string {
        let poolFee;
        if (this.selectedFarmId !== S.Strings.NOT_EXISTS) {
            poolFee = this.miningFarms[this.selectedFarmId]?.poolFee ?? S.NOT_EXISTS;
        } else {
            poolFee = S.NOT_EXISTS;
        }

        return poolFee === S.NOT_EXISTS ? '-' : `${poolFee}%`;
    }

    getPowerConsumptionDisplay(): string {
        let powerConsumptionPerTh;
        if (this.selectedFarmId !== S.Strings.NOT_EXISTS) {
            powerConsumptionPerTh = this.miningFarms[this.selectedFarmId]?.powerConsumptionPerTh ?? 0;
        } else {
            powerConsumptionPerTh = 0;
        }

        const hashRate = this.hashRateTh === S.NOT_EXISTS ? 0 : this.hashRateTh;

        return `${powerConsumptionPerTh * hashRate} W`;
    }

    getBlockRewardDisplay(): string {
        const blockReward = this.bitcoinStore.getBlockReward();
        return blockReward === S.Strings.EMPTY ? '-' : `${(new BigNumber(blockReward)).toFixed(2)} BTC`;
    }

}
