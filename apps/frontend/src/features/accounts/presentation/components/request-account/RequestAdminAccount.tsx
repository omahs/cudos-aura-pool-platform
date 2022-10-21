import React, { useState } from 'react';

import '../../styles/request-admin-account.css';
import { inject, observer } from 'mobx-react';
import RequestAdminAccountPageState from '../../stores/RequestAdminAccountPageState';
import S from '../../../../../core/utilities/Main';
import StepAccount from './StepAccount';
import StepFarmDetails from '../../../../mining-farm/presentation/components/credit-farm/StepFarmDetails';
import StepReview from './StepReview';
import StepSuccess from './StepSuccess';
import NavRow, { NavStep } from '../../../../../core/presentation/components/NavRow';

type Props = {
    onClickNavigateLogin: () => void
}

function RequestAdminAccount({ onClickNavigateLogin }: Props) {
    const [state] = useState(new RequestAdminAccountPageState());

    const navSteps: NavStep[] = [
        {
            navNumber: 1,
            navName: 'Account',
            isActive: state.isStepAccount(),
        },
        {
            navNumber: 2,
            navName: 'Farm Details',
            isActive: state.isStepFarmDetails(),
        },
        {
            navNumber: 3,
            navName: 'Finish',
            isActive: state.isStepReview(),
        },
    ];

    return (
        <div className={'RequestAdminAccountForm FlexColumn'}>
            <NavRow navSteps={navSteps}/>
            {state.isStepAccount() === true && (
                <StepAccount
                    adminEntity={state.adminEntity}
                    onClickContinue={state.setStepFarmDetails}
                    onClickNavigateLogin={onClickNavigateLogin}
                />)}
            {state.isStepFarmDetails() === true && (
                <StepFarmDetails
                    miningFarmEntity={state.miningFarmEntity}
                    imageEntities={state.imageEntities}
                    onClickContinue={state.setStepReview}
                />
            )}
            {state.isStepReview() === true && (
                <StepReview
                    adminEntity={state.adminEntity}
                    miningFarmEntity={state.miningFarmEntity}
                    imageEntities={state.imageEntities}
                    onClickContinue={state.finishCreation}
                    onClickBack={state.setStepFarmDetails}
                />
            )}
            {state.isStepSuccess() === true && (
                <StepSuccess
                    adminEntity={state.adminEntity}
                />
            )}
        </div>
    )
}

export default inject((stores) => stores)(observer(RequestAdminAccount));
