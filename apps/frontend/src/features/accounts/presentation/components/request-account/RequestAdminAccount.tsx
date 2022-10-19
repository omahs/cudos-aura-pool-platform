import React, { useState } from 'react';

import '../../styles/request-admin-account.css';
import { inject, observer } from 'mobx-react';
import RequestAdminAccountPageState from '../../stores/RequestAdminAccountPageState';
import S from '../../../../../core/utilities/Main';
import StepAccount from './StepAccount';
import StepFarmDetails from './StepFarmDetails';
import StepReview from './StepReview';
import StepSuccess from './StepSuccess';

type Props = {
    onClickNavigateLogin: () => void
}

function RequestAdminAccount({ onClickNavigateLogin }: Props) {
    const [state] = useState(new RequestAdminAccountPageState());

    return (
        <div className={'RequestAdminAccountForm FlexColumn'}>
            <div className={'FlexRow NavBar'}>
                <div
                    className={`FlexColumn NavItem ${S.CSS.getActiveClassName(state.isStepAccount() === true)}`}>
                    <div className={'NavNumber B3 FlexRow'}>1</div>
                    <div className={'B3 SemiBold'}>Account</div>
                </div>
                <div className={`FlexColumn NavItem ${S.CSS.getActiveClassName(state.isStepFarmDetails() === true)}`}>
                    <div className={'NavNumber B3 FlexRow'}>2</div>
                    <div className={'B3 SemiBold'}>Farm Details</div>
                </div>
                <div className={`FlexColumn NavItem ${S.CSS.getActiveClassName(state.isStepReview() === true)}`}>
                    <div className={'NavNumber B3 FlexRow'}>3</div>
                    <div className={'B3 SemiBold'}>Finish</div>
                </div>
                <div className={'HorizontalSeparator'} />
            </div>
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
