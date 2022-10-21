import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AccountSessionStore from '../stores/AccountSessionStore';
import AlertStore from '../../../../core/presentation/stores/AlertStore';

import { InputAdornment } from '@mui/material';
import Input from '../../../../core/presentation/components/Input';
import Svg from '../../../../core/presentation/components/Svg';
import Actions, { ActionsHeight, ActionsLayout } from '../../../../core/presentation/components/Actions';
import Button from '../../../../core/presentation/components/Button';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';
import BorderShadowPaddingContainer, { ContainerWidth } from '../../../../core/presentation/components/BorderShadowPaddingContainer';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../styles/page-login.css';

type Props = {
    alertStore?: AlertStore;
    accountSessionStore?: AccountSessionStore;
}

function LoginPage({ alertStore, accountSessionStore }: Props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [logging, setLogging] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function onClickForgottenPassword() {

    }

    function onClickRegister() {
        navigate(AppRoutes.REGISTER);
    }

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    async function onClickLogin() {
        setLogging(true);
        try {
            await accountSessionStore.login(email, password, '', null);
            navigate(AppRoutes.HOME);
        } catch (e) {
            console.log(e);
            alertStore.show('Wrong username/password');
        }
        setLogging(false);
    }

    return (
        <PageLayoutComponent className = { 'PageLogin' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >

                <BorderShadowPaddingContainer containerWidth = { ContainerWidth.SMALL } >
                    <div className={'Title H2 Bold'}>Log in</div>
                    <div className={'Subtitle'}>Fill your credentials in order to access your account</div>

                    <div className = { 'InputsCnt' } >
                        <Input
                            label={'Email'}
                            placeholder={'Email'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <Svg svg={AlternateEmailIcon}/>
                                </InputAdornment>,
                            }}
                            value={email}
                            onChange={setEmail} />
                        <Input
                            label={'Password'}
                            placeholder={'Password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" >
                                        <Svg className={'Clickable'} svg={showPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPassword}/>
                                    </InputAdornment>
                                ),
                            }}
                            value={password}
                            onChange={setPassword}
                            type={showPassword === false ? 'password' : 'text'} />
                    </div>

                    <div className={'ForgottenPassword B2 SemiBold Clickable'} onClick={onClickForgottenPassword}>Forgotten Password?</div>

                    <Actions className = { 'LoginActions' } layout={ActionsLayout.LAYOUT_COLUMN_FULL} height={ActionsHeight.HEIGHT_48}>
                        <Button onClick={onClickLogin}>
                            {logging === true ? <LoadingIndicator /> : 'Login'}
                        </Button>
                    </Actions>

                    <div className={'BottomAction B2 Clickable'} onClick={onClickRegister}>
                        You don’t have account? <span className = { 'Bold' }>Request Admin Account</span>
                    </div>
                </BorderShadowPaddingContainer>

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(LoginPage));
