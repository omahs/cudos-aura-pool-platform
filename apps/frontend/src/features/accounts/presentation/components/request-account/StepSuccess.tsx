import React from 'react';

import '../../styles/step-success.css';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../../core/presentation/components/Button';
import AdminEntity from '../../../entities/AdminEntity';
import { inject, observer } from 'mobx-react';
import Svg from '../../../../../core/presentation/components/Svg';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../../app-routes/entities/AppRoutes';

type Props = {
    adminEntity: AdminEntity
}

function StepReview({ adminEntity }: Props) {
    const navigete = useNavigate();

    function onClickGoHome() {
        navigete(AppRoutes.HOME);
    }

    return (
        <>
            <div className={'HeadingRow FullLine FlexRow'}>
                <Svg svg={CheckCircleIcon}/>
                <div className={'H3 Bold'}>Thanks for your request!</div>
            </div>
            <div className={'B1 FullLine'}>Your request will be reviewed by Aura Pool and you will receive an email with your unique credentials to access the Admin portal.</div>

            <div className={'EmailBox FlexRow'}>
                {adminEntity.email}
                <Svg svg={AlternateEmailIcon} />
            </div>
            <Actions className={'ButtonRow'} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickGoHome}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >Go to Home</Button>
            </Actions>
        </>
    )
}

export default inject((props) => props)(observer(StepReview));
