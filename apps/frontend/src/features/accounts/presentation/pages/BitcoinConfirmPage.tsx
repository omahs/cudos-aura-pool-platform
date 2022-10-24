import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import AccountSessionStore from '../stores/AccountSessionStore';

import Input from '../../../../core/presentation/components/Input';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';
import Actions, { ActionsHeight, ActionsLayout } from '../../../../core/presentation/components/Actions';
import Button from '../../../../core/presentation/components/Button';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import BorderShadowPaddingContainer, { ContainerWidth } from '../../../../core/presentation/components/BorderShadowPaddingContainer';

import '../styles/page-bitcoin-confirm.css';

type Props = {
    accountSessionStore?: AccountSessionStore;
}

function BitcoinConfirmPage({ accountSessionStore }: Props) {

    const [loading, setLoading] = useState(false);
    const [bitcoinAddress, setBitcoinAddress] = useState('');

    function onClickConfirmBitcoinAddress() {
        // TO DO: submit a tx
        setLoading(true);
        accountSessionStore.confirmBitcoinAddress();
        setLoading(false);
    }

    return (
        <PageLayoutComponent className = { 'PageBitcoinConfirm' } >

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >

                <BorderShadowPaddingContainer containerWidth = { ContainerWidth.SMALL } >

                    <div className={'Title H2 Bold'}>Confirm bitcoin address</div>
                    <div className={'Subtitle'}>Fill your bitcoin address</div>

                    <div className = { 'InputsCnt' } >
                        <Input
                            label={'Bitcoin address'}
                            placeholder={'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
                            value={bitcoinAddress}
                            onChange={setBitcoinAddress} />
                    </div>

                    <Actions className = { 'BitcoinConfirmActions' } layout={ActionsLayout.LAYOUT_COLUMN_FULL} height={ActionsHeight.HEIGHT_48}>
                        <Button onClick={onClickConfirmBitcoinAddress}>
                            {loading === true ? <LoadingIndicator /> : 'Confirm'}
                        </Button>
                    </Actions>

                </BorderShadowPaddingContainer>

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(BitcoinConfirmPage));
