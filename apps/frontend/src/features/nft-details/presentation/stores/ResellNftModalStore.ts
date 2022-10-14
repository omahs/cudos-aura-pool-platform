import S from '../../../../core/utilities/Main';
import { action, makeObservable, observable } from 'mobx';
import ModalStore from '../../../../core/presentation/stores/ModalStore';
import NftProfileEntity from '../../entities/NftEntity';
import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';

export enum ModalStage {
    PREVIEW,
    PROCESSING,
    SUCCESS,
    FAIL
}

export default class ResellNftModalStore extends ModalStore {

    @observable nft: NftProfileEntity;
    @observable cudosPrice: number;
    price: number;
    @observable priceDisplay: string;
    @observable collectionName: string;
    @observable modalStage: ModalStage;
    @observable originalPaymentSchedule: number;
    @observable autoPay: number;
    txHash: string;

    constructor() {
        super();

        this.resetValues();

        makeObservable(this);
    }

    resetValues() {
        this.cudosPrice = S.NOT_EXISTS;
        this.price = S.NOT_EXISTS;
        this.priceDisplay = S.Strings.EMPTY;
        this.collectionName = S.Strings.EMPTY;
        this.modalStage = S.NOT_EXISTS;
        this.autoPay = S.INT_FALSE;
        this.originalPaymentSchedule = S.INT_FALSE;
        this.txHash = S.Strings.EMPTY;
    }

    nullateValues() {
        this.cudosPrice = null;
        this.price = null;
        this.priceDisplay = null;
        this.collectionName = null;
        this.modalStage = null;
        this.autoPay = null;
        this.originalPaymentSchedule = null;
        this.txHash = null;
    }

    @action
    showSignal(nft: NftProfileEntity, cudosPrice: number, collectionName: string) {
        this.nft = nft;
        this.cudosPrice = cudosPrice;
        this.collectionName = collectionName;
        this.modalStage = ModalStage.FAIL;
        this.price = 0;
        this.priceDisplay = '0';
        this.autoPay = S.INT_FALSE;
        this.originalPaymentSchedule = S.INT_FALSE;

        this.show();
    }

    hide = () => {
        this.nullateValues();
        super.hide();
    }

    setPrice = (price: string) => {
        this.priceDisplay = price;
        this.price = Number(price);
    }

    buyNft = () => {
        this.modalStage = ModalStage.PROCESSING;

        // TODO: really buy nft

        setTimeout(() => {
            this.modalStage = ModalStage.SUCCESS;
        }, 2000)
    }

    toggleAutoPay = () => {
        this.autoPay = this.autoPay === S.INT_TRUE ? S.INT_FALSE : S.INT_TRUE;
    }

    toggleOriginalPaymentSchedule = () => {
        this.originalPaymentSchedule = this.originalPaymentSchedule === S.INT_TRUE ? S.INT_FALSE : S.INT_TRUE;
    }

    onClickSubmitForSell = () => {
        this.modalStage = ModalStage.PROCESSING;

        // TODO: really buy nft
        this.txHash = 'aergaerhuaeruaeruaeruaeruearueru'
        setTimeout(() => {
            this.modalStage = ModalStage.SUCCESS;
        }, 2000)
    }

    isStagePreview(): boolean {
        return this.modalStage === ModalStage.PREVIEW;
    }

    isStageProcessing(): boolean {
        return this.modalStage === ModalStage.PROCESSING;
    }

    isStageSuccess(): boolean {
        return this.modalStage === ModalStage.SUCCESS;
    }

    isStageFail(): boolean {
        return this.modalStage === ModalStage.FAIL;
    }

    getTxLink(): string {
        // TODO: dynamic link geenration for all networks
        return `${CHAIN_DETAILS.EXPLORER_URL['PRIVATE']}/${this.txHash}`
    }

}
