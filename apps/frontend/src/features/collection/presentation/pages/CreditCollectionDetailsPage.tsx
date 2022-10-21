import React from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-collection-details-page.css';

function CreditCollectionDetailsPage() {

    return (
        <PageLayoutComponent className = { 'PageCreditCollectionDetailsPage' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >
                <div>Credit Collection Details Page</div>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditCollectionDetailsPage));
