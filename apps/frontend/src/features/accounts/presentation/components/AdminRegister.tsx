import React, { useState } from 'react';

import '../styles/admin-register.css';
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
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';

type Props = {
    accountSessionStore?: AccountSessionStore;
    registerRedirect: () => void
}

function AdminRegister({ accountSessionStore, registerRedirect }: Props) {
    const [email, setEmail] = useState('');
    const [registering, setRegistering] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function onClickShowRepeatPassword() {
        setShowRepeatPassword(!showRepeatPassword);
    }
    async function onClickRegister() {
        setRegistering(true);
        await accountSessionStore.register(email, password, repeatPassword);
        registerRedirect();
        setRegistering(false);
    }

    return (
        <div className={'AdminLoginForm FlexColumn'}>
            <div className={'H2 Bold'}>Register</div>
            <div className={'B1'}>Fill your credentials in order to register an account</div>
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
            <Input
                label={'Repeat Password'}
                placeholder={'Repeat Password'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg className={'Clickable'} svg={showRepeatPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowRepeatPassword}/>
                    </InputAdornment>,
                }}
                value={repeatPassword}
                onChange={setRepeatPassword}
                type={showRepeatPassword === false ? 'password' : ''}
            />
            <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickRegister}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >
                    {registering === true ? <LoadingIndicator /> : 'Register'}
                </Button>
            </Actions>
        </div>
    )
}

export default inject((stores) => stores)(observer(AdminRegister));
