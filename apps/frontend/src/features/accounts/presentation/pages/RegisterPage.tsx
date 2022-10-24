import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import S from '../../../../core/utilities/Main';
import AccountSessionStore from '../stores/AccountSessionStore';
import AlertStore from '../../../../core/presentation/stores/AlertStore';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AppStore from '../../../../core/presentation/stores/AppStore';

import { InputAdornment } from '@mui/material';
import Input from '../../../../core/presentation/components/Input';
import Svg from '../../../../core/presentation/components/Svg';
import Button, { ButtonType } from '../../../../core/presentation/components/Button';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';
import AuthBlockLayout from '../components/AuthBlockLayout';
import AnimationContainer from '../../../../core/presentation/components/AnimationContainer';
import Checkbox from '../../../../core/presentation/components/Checkbox';
import NavRow from '../../../../core/presentation/components/NavRow';
import Actions from '../../../../core/presentation/components/Actions';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import '../styles/page-register.css';
import DataPreviewLayout, { createDataPreview } from '../../../../core/presentation/components/DataPreviewLayout';

enum RegisterStep {
    ACCOUNT_DETAILS,
    WALLET_DETAILS,
    FINISH,
}

type Props = {
    appStore?: AppStore;
    alertStore?: AlertStore;
    walletStore?: WalletStore;
    accountSessionStore?: AccountSessionStore;
}

function RegisterPage({ appStore, alertStore, walletStore, accountSessionStore }: Props) {
    const navigate = useNavigate();
    const [step, setStep] = useState(RegisterStep.ACCOUNT_DETAILS);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [cudosWalletAddress, setCudosWalletAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [personalInfo, setPersonalInfo] = useState(S.INT_FALSE);

    function isAccountDetailsStep() {
        return step === RegisterStep.ACCOUNT_DETAILS;
    }

    function isWalletDetailsStep() {
        return step === RegisterStep.WALLET_DETAILS;
    }

    function isFinishStep() {
        return step === RegisterStep.FINISH;
    }

    function moveToAccountDetails() {
        setStep(RegisterStep.ACCOUNT_DETAILS);
    }

    function moveToWalletDetails() {
        setStep(RegisterStep.WALLET_DETAILS);
    }

    function moveToFinishStep() {
        setStep(RegisterStep.FINISH);
    }

    function renderTopNav() {
        return (
            <NavRow
                navSteps = { [
                    {
                        navNumber: RegisterStep.ACCOUNT_DETAILS,
                        navName: 'Account Details',
                        isActive: isAccountDetailsStep(),
                    },
                    {
                        navNumber: RegisterStep.WALLET_DETAILS,
                        navName: 'Wallet Details',
                        isActive: isWalletDetailsStep(),
                    },
                    {
                        navNumber: RegisterStep.FINISH,
                        navName: 'Finish',
                        isActive: isFinishStep(),
                    },
                ] } />
        )
    }

    function renderAccountDetailsStep() {
        if (isAccountDetailsStep() === false) {
            return null;
        }

        function onClickShowPassword() {
            setShowPassword(!showPassword);
        }

        function onClickShowRepeatPassword() {
            setShowRepeatPassword(!showRepeatPassword);
        }

        function onClickLogin() {
            navigate(AppRoutes.LOGIN);
        }

        async function onClickRegister() {
            appStore.disableActions();
            moveToWalletDetails();
            await walletStore.connectKeplr();
            setCudosWalletAddress(walletStore.getAddress());
            appStore.enableActions();
        }

        return (
            <AuthBlockLayout
                prefix = { renderTopNav() }
                title = { 'Sign Up' }
                subtitle = { 'Fill in your email, password and the required farm details in order to sign up' }
                content = { (
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
                        <Button onClick={onClickRegister} > Continue </Button>
                        <Button type = { ButtonType.TEXT_INLINE } onClick={onClickLogin} >
                            <span className = { 'Regular' } > Already have an account? </span>&nbsp;Login
                        </Button>
                    </>
                ) } />
        )
    }

    function renderWalletDetailsStep() {
        if (isWalletDetailsStep() === false) {
            return null;
        }

        return (
            <AuthBlockLayout
                prefix = { renderTopNav() }
                title = { 'Connect Wallet' }
                subtitle = { 'Connect your cudos wallet.' }
                content = { (
                    <Input
                        label={'Connected Wallet'}
                        placeholder={'cudos1...'}
                        value={cudosWalletAddress}
                        gray = { true } />
                ) }
                suffix = { (
                    <div className = { 'FlexSplit' } >
                        <Actions>
                            <Button type = { ButtonType.TEXT_INLINE } onClick = { moveToAccountDetails } >
                                <Svg svg = { KeyboardBackspaceIcon } />
                                Back
                            </Button>
                        </Actions>
                        <Actions className = { 'StartRight' } >
                            <Button onClick = { moveToFinishStep }>Create Account</Button>
                        </Actions>
                    </div>
                ) } />
        )
    }

    function renderFinishStep() {
        if (isFinishStep() === false) {
            return null;
        }

        async function onClickCreateAccount() {
            // prepare a signed tx for register
            await accountSessionStore.register(email, password, name, cudosWalletAddress, '');
            await accountSessionStore.login(email, password, cudosWalletAddress, '');
            navigate(AppRoutes.HOME);
        }

        return (
            <AuthBlockLayout
                prefix = { renderTopNav() }
                title = { 'Finish Sign Up' }
                subtitle = { 'Review account info and create account.' }
                content = { (
                    <DataPreviewLayout
                        dataPreviews = { [
                            createDataPreview('Primary Account Owner', name),
                            createDataPreview('Email', email),
                            createDataPreview('Wallet Address', cudosWalletAddress),
                        ] } />
                ) }
                actions = { (
                    <Checkbox
                        label = { 'I agree to allow Aura Pool to store and process the personal information submitted above to provide me the service requested.' }
                        value = { personalInfo }
                        onChange = { setPersonalInfo } />
                ) }
                suffix = { (
                    <div className = { 'FlexSplit' } >
                        <Actions>
                            <Button type = { ButtonType.TEXT_INLINE } onClick = { moveToWalletDetails } >
                                <Svg svg = { KeyboardBackspaceIcon } />
                                Back
                            </Button>
                        </Actions>
                        <Actions className = { 'StartRight' } >
                            <Button disabled = { personalInfo === S.INT_FALSE } onClick = { onClickCreateAccount }>Create Account</Button>
                        </Actions>
                    </div>
                ) } />
        )
    }

    return (
        <PageLayoutComponent className = { 'PageRegister' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >

                <AnimationContainer active = { isAccountDetailsStep() } >
                    { renderAccountDetailsStep() }
                </AnimationContainer>

                <AnimationContainer active = { isWalletDetailsStep() } >
                    { renderWalletDetailsStep() }
                </AnimationContainer>

                <AnimationContainer active = { isFinishStep() } >
                    { renderFinishStep() }
                </AnimationContainer>

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(RegisterPage));
