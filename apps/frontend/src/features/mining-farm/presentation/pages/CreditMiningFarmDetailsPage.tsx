import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-mining-farm-details.css';
import NavRow, { NavStep } from '../../../../core/presentation/components/NavRow';
import StepFarmDetails from '../components/credit-farm/StepFarmDetails';
import CreditMiningFarmPageState from '../stores/CreditMiningFarmPageState';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import AppStore from '../../../../core/presentation/stores/AppStore';

type Props = {
    accountSessionStore?: AccountSessionStore;
    repoStore?: RepoStore;
    appStore?: AppStore;
}

function CreditMiningFarmDetailsPage({ accountSessionStore, repoStore, appStore }: Props) {
    const [state] = useState(new CreditMiningFarmPageState(accountSessionStore, repoStore));

    useEffect(() => {
        appStore.useLoading(() => {
            state.fetch();
        });
    }, []);

    const navSteps: NavStep[] = [
        {
            navNumber: 1,
            navName: 'Farm Details',
            isActive: state.isStepFarmDetails(),
        },
        {
            navNumber: 2,
            navName: 'Finish',
            isActive: state.isStepReview(),
        },
    ];

    return (
        <PageLayoutComponent className = { 'PageCreditMiningFarmDetails' }>

            <PageAdminHeader />
            <div className = { 'PageContent AppContent' } >
                <NavRow navSteps={navSteps}/>
                {state.miningFarmEntity !== null
                && (<StepFarmDetails
                    miningFarmEntity={state.miningFarmEntity}
                    imageEntities={state.imageEntities}
                    onClickContinue={state.setStepReview}
                />)}
                <div>CreditPage</div>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditMiningFarmDetailsPage));
