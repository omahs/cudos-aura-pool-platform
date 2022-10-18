import React, { useState } from 'react';

import '../styles/page-admin-portal-component.css';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import AdminLogin from '../components/AdminLogin';
import AdminPortalPageState from '../stores/AdminPortalPageState';
import AccountSessionStore from '../stores/AccountSessionStore';
import RequestAdminAccount from '../components/request-account/RequestAdminAccount';

type Props = {
    accountSessionStore?: AccountSessionStore;
}

function UserProfilePage({ accountSessionStore }: Props) {
    const [adminPortalPageState] = useState(new AdminPortalPageState());

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
                        onClickLogin={accountSessionStore.login}
                    />)}
                    {adminPortalPageState.isPageRequestAdminAccount() === true
                    && (<RequestAdminAccount onClickNavigateLogin={adminPortalPageState.setPageLogin}/>)}
                </div>
            </div>
            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(UserProfilePage));
