import S from '../../../../core/utilities/Main';
import { action, makeObservable, observable } from 'mobx';
import ModalStore from '../../../../core/presentation/stores/ModalStore';
import NftEntity from '../../entities/NftEntity';
import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';

export enum ModalStage {
    PREVIEW,
    PROCESSING,
    SUCCESS,
    FAIL
}

export default class BuyNftModalStore extends ModalStore {

    @observable nftEntity: NftEntity;
    @observable cudosPrice: number;
    @observable recipient: string;
    @observable collectionName: string;
    @observable modalStage: ModalStage;
    @observable txHash: string;

    constructor() {
        super();

        this.resetValues();

        makeObservable(this);
    }

    resetValues() {
        this.cudosPrice = S.NOT_EXISTS;
        this.recipient = S.Strings.EMPTY;
        this.collectionName = S.Strings.EMPTY;
        this.modalStage = S.NOT_EXISTS;
        this.txHash = S.Strings.EMPTY;
    }

    nullateValues() {
        this.cudosPrice = null;
        this.recipient = null;
        this.collectionName = null;
        this.modalStage = null;
        this.txHash = null;
    }

    @action
    showSignal(nftEntity: NftEntity, cudosPrice: number, collectionName: string) {
        this.nftEntity = nftEntity;
        this.cudosPrice = cudosPrice;
        this.collectionName = collectionName;
        this.modalStage = ModalStage.PREVIEW;
        this.txHash = S.Strings.EMPTY;

        this.show();
    }

    hide = () => {
        this.nullateValues();
        super.hide();
    }

    setRecipient = (recipient: string) => {
        this.recipient = recipient;
    }

    buyNft = () => {
        this.modalStage = ModalStage.PROCESSING;

        // TODO: really buy nftEntity
        this.txHash = 'aergaerhuaeruaeruaeruaeruearueru'
        setTimeout(() => {
            this.modalStage = ModalStage.SUCCESS;
        }, 2000)
    }

    getTxLink(): string {
        // TODO: dynamic link geenration for all networks
        return `${CHAIN_DETAILS.EXPLORER_URL['PRIVATE']}/${this.txHash}`
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
}
