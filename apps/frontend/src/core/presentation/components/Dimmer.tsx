// version 3.0.0

import React from 'react';
import { inject, observer } from 'mobx-react';

import AppStore from '../stores/AppStore';
import AnimationContainer from './AnimationContainer';

import '../styles/dimmer.css';

type Props = {
    appStore?: AppStore;
}

function Dimmer({ appStore }: Props) {
    return (
        <AnimationContainer className = { 'Dim' } active = { appStore.hasDimmer() } />
    );
}

export default inject('appStore')(observer(Dimmer));
