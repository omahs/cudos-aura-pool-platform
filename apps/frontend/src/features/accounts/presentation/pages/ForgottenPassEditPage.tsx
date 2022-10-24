import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AccountSessionStore from '../stores/AccountSessionStore';
import AlertStore from '../../../../core/presentation/stores/AlertStore';

import { InputAdornment } from '@mui/material';
import Input from '../../../../core/presentation/components/Input';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';
import Button from '../../../../core/presentation/components/Button';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import AuthBlockLayout from '../components/AuthBlockLayout';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/page-forgotten-pass-edit.css';

type Props = {
    alertStore?: AlertStore;
    accountSessionStore?: AccountSessionStore;
}

function ForgottenPassEditPage({ alertStore, accountSessionStore }: Props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showUpdatedStep, setShowUpdatedStep] = useState(false);

    async function onClickSendNewPassword() {
        setLoading(true);
        await accountSessionStore.editPassword('token', pass);
        setShowUpdatedStep(true);
        setLoading(false);
    }

    function onClickBackToLogin() {
        navigate(AppRoutes.LOGIN);
    }

    function renderRequestStep() {
        if (showUpdatedStep === true) {
            return null;
        }

        return (
            <AuthBlockLayout
                title = { 'Set new password' }
                subtitle = { 'Check your email and update your password.' }
                inputs = { (
                    <>
                        <Input
                            label={'New Password'}
                            placeholder={'***************'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <Svg svg={AlternateEmailIcon}/>
                                </InputAdornment>,
                            }}
                            value={pass}
                            onChange={setPass} />
                        <Input
                            label={'Confirm Password'}
                            placeholder={'***************'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <Svg svg={AlternateEmailIcon}/>
                                </InputAdornment>,
                            }}
                            value={confirmPass}
                            onChange={setConfirmPass} />
                    </>
                ) }
                actions = { (
                    <Button onClick = { loading === true ? null : onClickSendNewPassword } >
                        {loading === true ? <LoadingIndicator /> : 'Update Password'}
                    </Button>
                ) } />
        )
    }

    function renderResendStep() {
        if (showUpdatedStep === false) {
            return null;
        }

        return (
            <>
                <AuthBlockLayout
                    title = { (
                        <div className = { 'FlexRow' }>
                            <Svg className = { 'IconCheck' } size = { SvgSize.CUSTOM } svg = { CheckCircleIcon } />
                            Password was updated
                        </div>
                    ) }
                    subtitle = { 'You successfully updated your password. Login to your account now.' }
                    actions = { (
                        <Button onClick = { onClickBackToLogin } > To Login </Button>
                    ) } />
            </>
        )
    }

    return (
        <PageLayoutComponent className = { 'PageForgottenPassEdit' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >

                { renderRequestStep() }

                { renderResendStep() }

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(ForgottenPassEditPage));
