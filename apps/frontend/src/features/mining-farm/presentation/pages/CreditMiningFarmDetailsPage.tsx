import React from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-mining-farm-details.css';

function CreditMiningFarmDetailsPage() {

    return (
        <PageLayoutComponent className = { 'PageCreditMiningFarmDetails' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >
                <div>CreditPage</div>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditMiningFarmDetailsPage));
