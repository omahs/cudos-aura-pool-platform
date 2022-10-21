import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-mining-farm-details.css';
import NavRow, { NavStep } from '../../../../core/presentation/components/NavRow';
import StepFarmDetails from '../components/credit-farm/StepFarmDetails';
import CreditMiningFarmDetailsPageState from '../stores/CreditMiningFarmDetailsPageState';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import StepReview from '../components/credit-farm/StepReview';
import StepSuccess from '../components/credit-farm/StepSuccess';

type Props = {
    accountSessionStore?: AccountSessionStore;
    repoStore?: RepoStore;
    appStore?: AppStore;
}

function CreditMiningFarmDetailsPage({ accountSessionStore, repoStore, appStore }: Props) {
    const [state] = useState(new CreditMiningFarmDetailsPageState(accountSessionStore, repoStore));

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

    function CreditHeading() {
        if (state.miningFarmEntity.isNew() === true) {
            return (<>
                <div className={'H3 Bold FullLine'}>Welcome to AuraPool</div>
                <div className={'B1 FullLine'}>Follow the steps to create your Farm Profile</div>
            </>)
        }

        return (<>
            <div className={'H3 Bold FullLine'}>Edit Farm Profile</div>
            <div className={'B1 FullLine'}>Review and update your Farm Profile details and submit for review.</div>
        </>)
    }

    return (
        <PageLayoutComponent className = { 'PageCreditMiningFarmDetails' }>

            <PageAdminHeader />
            <div className = { 'PageContent AppContent' } >
                <div className={'RequestAdminAccountForm FlexColumn'}>
                    {state.isStepSuccess() === false && (<NavRow navSteps={navSteps}/>)}

                    {state.miningFarmEntity !== null && state.isStepFarmDetails() === true
                    && (<>
                        <CreditHeading />
                        <StepFarmDetails
                            miningFarmEntity={state.miningFarmEntity}
                            imageEntities={state.imageEntities}
                            onClickContinue={state.setStepReview}
                        />
                    </>)}
                    {state.miningFarmEntity !== null && state.isStepReview() === true
                    && (<StepReview
                        adminEntity={accountSessionStore.adminEntity}
                        miningFarmEntity={state.miningFarmEntity}
                        imageEntities={state.imageEntities}
                        onClickContinue={state.finishCreation}
                        onClickBack={state.setStepFarmDetails}
                    />)}

                    {state.isStepSuccess() === true && (
                        <StepSuccess adminEntity={accountSessionStore.adminEntity}/>
                    )}
                </div>
            </div>
            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditMiningFarmDetailsPage));
