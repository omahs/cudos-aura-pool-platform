import S from '../../../../core/utilities/Main';
import { action, makeObservable, observable } from 'mobx';
import ModalStore from '../../../../core/presentation/stores/ModalStore';

export default class CreditCollectionSuccessModalStore extends ModalStore {

    constructor() {
        super();

        makeObservable(this);
    }
    nullateValues() {

    }

    @action
    showSignal() {

        this.show();
    }

    hide = () => {
        this.nullateValues();

        super.hide();
    }
}
