import React from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-mining-farm-analytics.css';

function MiningFarmAnalyticsPage() {

    return (
        <PageLayoutComponent className = { 'PageMiningFarmAnalytics' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >
                <div>Mining farm analytics page</div>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(MiningFarmAnalyticsPage));
