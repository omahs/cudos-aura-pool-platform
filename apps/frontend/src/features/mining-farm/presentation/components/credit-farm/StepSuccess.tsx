import React from 'react';
import { inject, observer } from 'mobx-react';

import AccountSessionStore from '../../../../accounts/presentation/stores/AccountSessionStore';

import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../../core/presentation/components/Actions';
import Button from '../../../../../core/presentation/components/Button';
import Svg from '../../../../../core/presentation/components/Svg';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../../styles/step-success.css';

type Props = {
    accountSessionStore?: AccountSessionStore
}

function StepReview({ accountSessionStore }: Props) {

    async function onClickGoHome() {
        await accountSessionStore.loadAdminMiningFarmApproval();
    }

    return (
        <div className = { 'StepMiningFarmSuccess FlexColumn' }>
            <div className={'HeadingRow FullLine FlexRow'}>
                <Svg svg={CheckCircleIcon}/>
                <div className={'H3 Bold'}>Thanks for your request!</div>
            </div>
            <div className={'B1 FullLine'}>Your request will be reviewed by Aura Pool and you will receive an email with your unique credentials to access the Admin portal.</div>

            {/* <div className={'EmailBox FlexRow'}>
                {accountSessionStore.accountEntity.email}
                <Svg svg={AlternateEmailIcon} />
            </div> */}
            <Actions className={'ButtonRow'} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button onClick={onClickGoHome}>Go to Home</Button>
            </Actions>
        </div>
    )
}

export default inject((stores) => stores)(observer(StepReview));
