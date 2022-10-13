import S from '../../../../../src/core/utilities/Main';
import { action, makeObservable, observable } from 'mobx';
import ModalStore from '../../../../core/presentation/stores/ModalStore';
import NftProfile from '../../entities/NftProfile';

export default class BuyNftModalStore extends ModalStore {
    @observable nft: NftProfile;
    @observable cudosPrice: number;
    @observable recipient: string;

    constructor() {
        super();

        this.cudosPrice = S.NOT_EXISTS;
        this.recipient = S.Strings.EMPTY;

        makeObservable(this);
    }

    @action
    showSignal(nft: NftProfile, cudosPrice: number) {
        this.nft = nft;
        this.cudosPrice = cudosPrice;

        this.show();
    }

    setRecipient(recipient: string) {
        this.recipient = recipient;
    }
}
