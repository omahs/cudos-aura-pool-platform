import React, { useState } from 'react';

import '../styles/page-admin-portal-component.css';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import AdminLogin from '../components/AdminLogin';
import AdminPortalPageState from '../stores/AdminPortalPageState';
import RequestAdminAccount from '../components/request-account/RequestAdminAccount';
import ChangePassword from '../components/ChangePassword';
import AdminRegister from '../components/AdminRegister';
import AccountSessionStore from '../stores/AccountSessionStore';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import { useNavigate } from 'react-router-dom';

type Props = {
    accountSessionStore: AccountSessionStore
}

function UserProfilePage() {
    const [adminPortalPageState] = useState(new AdminPortalPageState());
    const navigate = useNavigate();

    const loginRedirect = async () => {
        navigate(AppRoutes.HOME);
    }

    return (
        <PageLayoutComponent
            className = { 'PageAdminPortal' }>
            <PageHeader />
            <div className={'PageContent AppContent FlexColumn'} >
                <div className={'FormBox FlexColumn'}>
                    {adminPortalPageState.isPageLogin() === true
                    && (<AdminLogin
                        onClickForgottenPassword={adminPortalPageState.setPageForgottenPassword}
                        onClickRequestAccount={adminPortalPageState.setPageRequestAccount}
                        loginRedirect={loginRedirect}
                    />)}
                    {adminPortalPageState.isPageRegisterAdminAccount() === true
                    && (<AdminRegister registerRedirect={adminPortalPageState.setPageLogin}/>)}
                    {adminPortalPageState.isPageRequestAdminAccount() === true
                    && (<RequestAdminAccount onClickNavigateLogin={adminPortalPageState.setPageLogin}/>)}
                    {adminPortalPageState.isPageChangePassword() === true
                    && (<ChangePassword />)}
                </div>
            </div>
            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(UserProfilePage));
