import { makeObservable, observable } from 'mobx';
import ModalStore from '../../../../core/presentation/stores/ModalStore';

export default class ExampleModalStore extends ModalStore {

    @observable content: string;

    constructor() {
        super();
        makeObservable(this);
    }

    showSignal(content: string) {
        this.content = content;
        this.show();
    }

}
