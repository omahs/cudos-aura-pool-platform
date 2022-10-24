import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import AccountSessionStore from '../stores/AccountSessionStore';
import AlertStore from '../../../../core/presentation/stores/AlertStore';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

import { InputAdornment } from '@mui/material';
import Input from '../../../../core/presentation/components/Input';
import Svg from '../../../../core/presentation/components/Svg';
import Button, { ButtonType } from '../../../../core/presentation/components/Button';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';
import AuthBlockLayout from '../components/AuthBlockLayout';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import '../styles/page-register.css';

type Props = {
    alertStore?: AlertStore;
    walletStore?: WalletStore;
    accountSessionStore?: AccountSessionStore;
}

function RegisterPage({ alertStore, walletStore, accountSessionStore }: Props) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [registering, setRegistering] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    function onClickLogin() {
        navigate(AppRoutes.LOGIN);
    }

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function onClickShowRepeatPassword() {
        setShowRepeatPassword(!showRepeatPassword);
    }

    async function onClickRegister() {
        setRegistering(true);
        await walletStore.connectKeplr();
        // prepare a signed tx for register
        await accountSessionStore.register(email, password, name, walletStore.getAddress(), '');
        setRegistering(false);
        navigate(AppRoutes.LOGIN);
    }

    return (
        <PageLayoutComponent className = { 'PageRegister' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >

                <AuthBlockLayout
                    title = { 'Sign Up' }
                    subtitle = { 'Fill in your email, password and the required farm details in order to sign up' }
                    inputs = { (
                        <>
                            <Input
                                label={'Full Name'}
                                placeholder={'John Doe'}
                                value={name}
                                onChange={setName} />
                            <Input
                                label={'Email'}
                                placeholder={'exampleemail@mail.com'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <Svg svg={AlternateEmailIcon}/>
                                    </InputAdornment>,
                                }}
                                value={email}
                                onChange={setEmail} />
                            <Input
                                label={'Password'}
                                placeholder={'***************'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end" >
                                        <Svg className={'Clickable'} svg={showPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPassword}/>
                                    </InputAdornment>,
                                }}
                                value={password}
                                onChange={setPassword}
                                type={showPassword === false ? 'password' : 'text'} />
                            <Input
                                label={'Repeat Password'}
                                placeholder={'***************'}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">
                                        <Svg className={'Clickable'} svg={showRepeatPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowRepeatPassword}/>
                                    </InputAdornment>,
                                }}
                                value={repeatPassword}
                                onChange={setRepeatPassword}
                                type={showRepeatPassword === false ? 'password' : 'text'} />
                        </>
                    ) }
                    actions = { (
                        <>
                            <Button onClick={registering === true ? null : onClickRegister} >
                                {registering === true ? <LoadingIndicator /> : 'Register'}
                            </Button>
                            <Button type = { ButtonType.TEXT_INLINE } onClick={onClickLogin} >
                                <span className = { 'Regular' } > Already have an account? </span>&nbsp;Login
                            </Button>
                        </>
                    ) } />

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(RegisterPage));
