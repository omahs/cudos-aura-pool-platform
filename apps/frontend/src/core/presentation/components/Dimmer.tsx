// version 3.0.0

import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AppStore from '../stores/AppStore';

import '../styles/dimmer.css';

type Props = {
    appStore?: AppStore;
}

function Dimmer({ appStore }: Props) {
    return (
        <div className = { `Dim Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(appStore.hasDimmer())}` } />
    );
}

export default inject('appStore')(observer(Dimmer));
