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
import AccountSessionStore from '../stores/AccountSessionStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import S from '../../../../core/utilities/Main';
import AlertStore from '../../../../core/presentation/stores/AlertStore';

type Props = {
    alertStore: AlertStore;
    accountSessionStore?: AccountSessionStore;
    onClickForgottenPassword: () => void
    onClickRequestAccount: () => void
    loginRedirect: () => void
}

function AdminLogin({ alertStore, accountSessionStore, onClickForgottenPassword, onClickRequestAccount, loginRedirect }: Props) {
    const [email, setEmail] = useState('');
    const [logging, setLogging] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    async function onClickLogin() {
        setLogging(true);
        try {
            await accountSessionStore.login(email, password, '', null);
            loginRedirect();
        } catch (e) {
            alertStore.show('Account not found');
        }
        setLogging(false);
    }

    return (
        <div className={'AdminLoginForm FlexColumn'}>
            <div className={'H2 Bold'}>Log in</div>
            <div className={'B1'}>Fill your credentials in order to access your account</div>
            <Input
                label={'Email'}
                placeholder={'Email'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg svg={AlternateEmailIcon}/>
                    </InputAdornment>,
                }}
                value={email}
                onChange={setEmail}
                inputType={InputType.TEXT}
            />
            <Input
                label={'Password'}
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
            <div className={'ForgottenPassword B2 SemiBold Clickable FlexRow'} onClick={onClickForgottenPassword}>Forgotten Password?</div>
            <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickLogin}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >
                    {logging === true ? <LoadingIndicator /> : 'Login'}
                </Button>
            </Actions>
            <div className={'RequestAccount B2 Bold Clickable FlexRow'} onClick={onClickRequestAccount}>You don’t have account? Request Admin Account</div>
        </div>
    )
}

export default inject((stores) => stores)(observer(AdminLogin));
