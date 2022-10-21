import React, { useEffect } from 'react';
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
    creditMiningFarmDetailsPageStore?: CreditMiningFarmDetailsPageState;
    accountSessionStore?: AccountSessionStore;
    appStore?: AppStore;
}

function CreditMiningFarmDetailsPage({ creditMiningFarmDetailsPageStore, accountSessionStore, appStore }: Props) {
    useEffect(() => {
        appStore.useLoading(() => {
            creditMiningFarmDetailsPageStore.fetch();
        });
    }, []);

    const navSteps: NavStep[] = [
        {
            navNumber: 1,
            navName: 'Farm Details',
            isActive: creditMiningFarmDetailsPageStore.isStepFarmDetails(),
        },
        {
            navNumber: 2,
            navName: 'Finish',
            isActive: creditMiningFarmDetailsPageStore.isStepReview(),
        },
    ];

    function CreditHeading() {
        if (creditMiningFarmDetailsPageStore.miningFarmEntity.isNew() === true) {
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
                    {creditMiningFarmDetailsPageStore.isStepSuccess() === false && (<NavRow navSteps={navSteps}/>)}

                    {creditMiningFarmDetailsPageStore.miningFarmEntity !== null && creditMiningFarmDetailsPageStore.isStepFarmDetails() === true
                    && (<>
                        <CreditHeading />
                        <StepFarmDetails
                            miningFarmEntity={creditMiningFarmDetailsPageStore.miningFarmEntity}
                            imageEntities={creditMiningFarmDetailsPageStore.imageEntities}
                            onClickContinue={creditMiningFarmDetailsPageStore.setStepReview}
                        />
                    </>)}
                    {creditMiningFarmDetailsPageStore.miningFarmEntity !== null && creditMiningFarmDetailsPageStore.isStepReview() === true
                    && (<StepReview
                        adminEntity={accountSessionStore.adminEntity}
                        miningFarmEntity={creditMiningFarmDetailsPageStore.miningFarmEntity}
                        imageEntities={creditMiningFarmDetailsPageStore.imageEntities}
                        onClickContinue={creditMiningFarmDetailsPageStore.finishCreation}
                        onClickBack={creditMiningFarmDetailsPageStore.setStepFarmDetails}
                    />)}

                    {creditMiningFarmDetailsPageStore.isStepSuccess() === true && (
                        <StepSuccess adminEntity={accountSessionStore.adminEntity}/>
                    )}
                </BorderShadowPaddingContainer>
            </div>
            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditMiningFarmDetailsPage));
