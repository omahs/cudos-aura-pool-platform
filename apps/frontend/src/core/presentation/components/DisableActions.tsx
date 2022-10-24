// version 3.0.0

import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AppStore from '../stores/AppStore';

import AnimationContainer from './AnimationContainer';

import '../styles/disable-actions.css';

type Props = {
    appStore?: AppStore;
}

function DisableActions({ appStore }: Props) {

    return (
        <AnimationContainer
            className = { 'DisableActions' }
            active = { appStore.hasDisabledActions() }
            onClick = { S.stopPropagation } >
            <label className = { 'Transition' } ></label>
        </AnimationContainer>
    );

}

export default inject('appStore')(observer(DisableActions));
