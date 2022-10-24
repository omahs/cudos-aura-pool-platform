import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AccountSessionStore from '../stores/AccountSessionStore';
import AlertStore from '../../../../core/presentation/stores/AlertStore';

import { InputAdornment } from '@mui/material';
import Input from '../../../../core/presentation/components/Input';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';
import Button, { ButtonType } from '../../../../core/presentation/components/Button';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';
import AuthBlockLayout from '../components/AuthBlockLayout';

import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import '../styles/page-email-verification-request.css';

type Props = {
    alertStore?: AlertStore;
    accountSessionStore?: AccountSessionStore;
}

function EmailVerificationRequestPage({ alertStore, accountSessionStore }: Props) {

    const email = accountSessionStore.accountEntity.email;

    async function onClickResend() {
        await accountSessionStore.sendVerificationEmail();
        alertStore.show('We have resent the email.');
    }

    return (
        <PageLayoutComponent className = { 'PageEmailVerificationRequest' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >

                <AuthBlockLayout
                    confirmationTitle = { 'Please verify your email for AuraPool!' }
                    confirmationTitleSvg = { MailOutlineIcon }
                    subtitle = { 'In order to create farm and collections you need to verify your email address.' }
                    content = { (
                        <Input
                            placeholder={'Email'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <Svg svg={AlternateEmailIcon}/>
                                </InputAdornment>,
                            }}
                            gray = { true }
                            value={email}/>
                    ) }
                    actions = { (
                        <Button type = { ButtonType.TEXT_INLINE } onClick = { onClickResend } >
                            Resend Link
                        </Button>
                    ) } />

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(EmailVerificationRequestPage));
