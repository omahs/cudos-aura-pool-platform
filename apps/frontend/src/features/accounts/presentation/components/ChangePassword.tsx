import React, { useState } from 'react';

import '../styles/admin-login.css';
import { inject, observer } from 'mobx-react';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Svg from '../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';

type Props = {
    miningFarmEntity: MiningFarmEntity
    onClickLogin: (newPassword: string, newPasswordRepeated: string) => void
}

function ChangePassword({ miningFarmEntity, onClickLogin }: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [showPasswordRepeat, setshowPasswordRepeat] = useState(false);

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function onClickShowPasswordRepeat() {
        setshowPasswordRepeat(!showPasswordRepeat);
    }

    return (
        <div className={'ChangePasswordForm FlexColumn'}>
            <div className={'H2 Bold'}>Welcome, {miningFarmEntity.name}</div>
            <div className={'B1'}><b>First</b> thing to do: <b>Change</b> to your prefered password</div>

            <Input
                label={'New Password'}
                placeholder={'Password'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg className={'Clickable'} svg={showPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPassword}/>
                    </InputAdornment>,
                }}
                value={password}
                onChange={setPassword}
                type={showPassword === false ? 'password' : ''}
            />

            <Input
                label={'Confirm Password'}
                placeholder={'Confirm Password'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg className={'Clickable'} svg={showPasswordRepeat === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPasswordRepeat}/>
                    </InputAdornment>,
                }}
                value={password}
                onChange={setPasswordRepeat}
                type={showPasswordRepeat === false ? 'password' : ''}
            />
            <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={() => onClickLogin(password, passwordRepeat)}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >Access your account</Button>
            </Actions>
        </div>
    )
}

export default inject((stores) => stores)(observer(ChangePassword));
