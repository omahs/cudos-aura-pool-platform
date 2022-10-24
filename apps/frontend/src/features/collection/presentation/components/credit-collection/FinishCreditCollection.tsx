import { inject, observer } from 'mobx-react';
import React from 'react';
import Actions, { ActionsLayout } from '../../../../../core/presentation/components/Actions';
import Button, { ButtonType } from '../../../../../core/presentation/components/Button';
import Svg from '../../../../../core/presentation/components/Svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../styles/finish-credit-collection.css';

type Props = {
    onClickBack: () => void
    onClickSendForApproval: () => void
}

function FinishCreditCollection({ onClickBack, onClickSendForApproval }: Props) {
    return (
        <div className={'FinishCreditCollection FlexColumn'}>
            <div className={'H3 Bold'}>Finalise</div>
            <div className={'B1'}>Check all the iformation related to the collection.</div>
            <div className={'InstructionsBox B2'}>
                <ul>
                    <li>Review the collection and hash rate  information before sending it for approval to Aura Pool.</li>
                    <li>Once your collection is reviewed and approved you'll receive a notification on your email address.</li>
                    <li>Once Aura Pool verifies and approves this NFT will go on sale immediately.</li>
                </ul>
            </div>
            <Actions layout={ActionsLayout.LAYOUT_ROW_ENDS} className={'ButtonsRow'}>
                <Button type={ButtonType.TEXT_INLINE} onClick={onClickBack}>
                    <Svg svg={ArrowBackIcon} />
                    Back
                </Button>
                <Button onClick={onClickSendForApproval}>
                    Send for Approval
                </Button>
            </Actions>
        </div>
    )
}

export default inject((stores) => stores)(observer(FinishCreditCollection));
