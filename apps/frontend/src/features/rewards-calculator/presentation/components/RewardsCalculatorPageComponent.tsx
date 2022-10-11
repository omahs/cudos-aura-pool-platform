import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../core/utilities/Main';
import AlertStore from '../../../../core/presentation/stores/AlertStore';

import PageComponent from '../../../../core/presentation/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from '../../../../core/presentation/components-pages/ContextPageComponent';
import PageHeader from '../../../../core/presentation/components/PageHeader';
import PageFooter from '../../../../core/presentation/components/PageFooter';

import '../styles/rewards-calculator-page-component.css';

interface Props extends ContextPageComponentProps {
    alertStore: AlertStore,
}

export default class RewardsCalculator extends ContextPageComponent<Props> {

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'walletStore')(observer(RewardsCalculator));
        PageComponent.layout(<MobXComponent />);
    }

    constructor(props: Props) {
        super(props);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageNft';
    }

    isKeplrRequired() {
        return true;
    }

    renderContent() {
        const { walletStore } = this.props;

        if (walletStore.isKeplrConnected() === false) {
            return <LoadingIndicator margin={'auto'} />
        }

        return (
            <>

            </>
        )
    }

    renderPopups(): any[] {
        return super.renderPopups().concat([
        ]);
    }
}
