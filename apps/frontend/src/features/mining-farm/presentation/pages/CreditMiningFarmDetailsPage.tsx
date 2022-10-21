import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-mining-farm-details.css';
import NavRow, { NavStep } from '../../../../core/presentation/components/NavRow';
import StepFarmDetails from '../components/credit-farm/StepFarmDetails';
import CreditMiningFarmDetailsPageState from '../stores/CreditMiningFarmDetailsPageStore';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import StepReview from '../components/credit-farm/StepReview';
import StepSuccess from '../components/credit-farm/StepSuccess';
import BorderShadowPaddingContainer from '../../../../core/presentation/components/BorderShadowPaddingContainer';

type Props = {
    creditMiningFarmDetailsPageState?: CreditMiningFarmDetailsPageState;
    accountSessionStore?: AccountSessionStore;
    appStore?: AppStore;
}

function CreditMiningFarmDetailsPage({ creditMiningFarmDetailsPageState, accountSessionStore, appStore }: Props) {
    useEffect(() => {
        appStore.useLoading(() => {
            creditMiningFarmDetailsPageState.fetch();
        });
    }, []);

    const navSteps: NavStep[] = [
        {
            navNumber: 1,
            navName: 'Farm Details',
            isActive: creditMiningFarmDetailsPageState.isStepFarmDetails(),
        },
        {
            navNumber: 2,
            navName: 'Finish',
            isActive: creditMiningFarmDetailsPageState.isStepReview(),
        },
    ];

    function CreditHeading() {
        if (creditMiningFarmDetailsPageState.miningFarmEntity.isNew() === true) {
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
                <BorderShadowPaddingContainer className={'FormContainer FlexColumn'}>
                    {creditMiningFarmDetailsPageState.isStepSuccess() === false && (<NavRow navSteps={navSteps}/>)}

                    {creditMiningFarmDetailsPageState.miningFarmEntity !== null && creditMiningFarmDetailsPageState.isStepFarmDetails() === true
                    && (<>
                        <CreditHeading />
                        <StepFarmDetails
                            miningFarmEntity={creditMiningFarmDetailsPageState.miningFarmEntity}
                            imageEntities={creditMiningFarmDetailsPageState.imageEntities}
                            onClickContinue={creditMiningFarmDetailsPageState.setStepReview}
                        />
                    </>)}
                    {creditMiningFarmDetailsPageState.miningFarmEntity !== null && creditMiningFarmDetailsPageState.isStepReview() === true
                    && (<StepReview
                        adminEntity={accountSessionStore.adminEntity}
                        miningFarmEntity={creditMiningFarmDetailsPageState.miningFarmEntity}
                        imageEntities={creditMiningFarmDetailsPageState.imageEntities}
                        onClickContinue={creditMiningFarmDetailsPageState.finishCreation}
                        onClickBack={creditMiningFarmDetailsPageState.setStepFarmDetails}
                    />)}

                    {creditMiningFarmDetailsPageState.isStepSuccess() === true && (
                        <StepSuccess adminEntity={accountSessionStore.adminEntity}/>
                    )}
                </BorderShadowPaddingContainer>
            </div>
            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditMiningFarmDetailsPage));
