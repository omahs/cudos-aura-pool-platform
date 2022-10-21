import React from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/mining-farm-credit-page.css';

function MiningFarmCreditPage() {

    return (
        <PageLayoutComponent className = { 'PageMiningFarmCredit' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >
                <div>Mining farm credit page</div>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(MiningFarmCreditPage));
