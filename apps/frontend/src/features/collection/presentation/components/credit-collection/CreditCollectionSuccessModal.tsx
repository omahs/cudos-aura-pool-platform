import React from 'react';
import { inject, observer } from 'mobx-react';
import CreditCollectionSuccessModalStore from '../../stores/CreditCollectionSuccessModalStore';
import ModalWindow from '../../../../../core/presentation/components/ModalWindow';

type Props = {
    creditCollectionSuccessModalStore?: CreditCollectionSuccessModalStore;
}

function CreditCollectionSuccessModal({ creditCollectionSuccessModalStore }: Props) {

    return (
        <ModalWindow modalStore = { creditCollectionSuccessModalStore } >

        </ModalWindow>
    )

}

export default inject((stores) => stores)(observer(CreditCollectionSuccessModal));
