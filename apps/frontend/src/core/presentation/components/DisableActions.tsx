// version 3.0.0

import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AppStore from '../stores/AppStore';

import '../styles/disable-actions.css';

type Props = {
    appStore?: AppStore;
}

function DisableActions({ appStore }: Props) {

    return (
        <div
            className = { `DisableActions Transition ActiveVisibilityHidden${S.CSS.getActiveClassName(appStore.hasDisabledActions())}` }
            onClick = { S.stopPropagation } >
            <label className = { 'Transition' } ></label>
        </div>
    );

}

export default inject('appStore')(observer(DisableActions));
