import React from 'react';
import { inject, observer } from 'mobx-react';

import AppStore from '../stores/AppStore';

import LoadingIndicator from './LoadingIndicator';
import AnimationContainer from './AnimationContainer';

import '../styles/page-loading-indicator.css';

type Props = {
    appStore?: AppStore;
}

function PageLoadingIndicator({ appStore }: Props) {

    return (
        <AnimationContainer className = { 'PageLoadingIndicator FlexSingleCenter' } active = { appStore.hasLoading() } >
            <LoadingIndicator margin = { 'auto' } />
        </AnimationContainer>
    )

}

export default inject('appStore')(observer(PageLoadingIndicator));
