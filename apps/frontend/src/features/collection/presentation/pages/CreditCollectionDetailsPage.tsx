import React from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-collection-details-page.css';
import BorderShadowPaddingContainer from '../../../../core/presentation/components/BorderShadowPaddingContainer';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';

function CreditCollectionDetailsPage() {
    const navigate = useNavigate();

    const crumbs = [
        { name: 'My Collections', onClick: () => { navigate(AppRoutes.USER_PROFILE) } },
        { name: 'Create Collection' },
    ]

    return (
        <PageLayoutComponent className = { 'PageCreditCollectionDetailsPage' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >
                <Breadcrumbs crumbs={crumbs} />

                <BorderShadowPaddingContainer className={'FlexRow'}>

                </BorderShadowPaddingContainer>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditCollectionDetailsPage));
