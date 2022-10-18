import React from 'react';

import '../../styles/request-admin-account.css';
import Input, { InputType } from '../../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Svg from '../../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../../core/presentation/components/Button';
import AdminEntity from '../../../entities/AdminEntity';
import { observer } from 'mobx-react';

type Props = {
    adminEntity: AdminEntity
    onClickContinue: () => void
    onClickNavigateLogin: () => void
}

function StepAccount({ adminEntity, onClickContinue, onClickNavigateLogin }: Props) {
    return (
        <>
            <div className={'H2 Bold Heading'}>Request Admin Account</div>
            <div className={'B1'}>Fill in your email and the required farm details in order to request an account. The information will be reviewed.</div>
            <Input
                label={'Email'}
                placeholder={'examplemail@mail.com'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg svg={AlternateEmailIcon}/>
                    </InputAdornment>,
                }}
                value={adminEntity.email}
                onChange={(string) => { adminEntity.email = string }}
                inputType={InputType.TEXT}
            />
            <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickContinue}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >Continue</Button>
            </Actions>
            <div className={'RequestAccount B2 Clickable FlexRow'} onClick={onClickNavigateLogin}>Already have an account? <b> Login</b></div>
        </>
    )
}

export default (observer(StepAccount));
