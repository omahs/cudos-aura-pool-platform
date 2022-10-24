import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';

import AppRoutes from '../../../app-routes/entities/AppRoutes';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import '../styles/page-credit-collection-nfts.css';
import AppStore from '../../../../core/presentation/stores/AppStore';
import CreditCollectionNftsPageStore from '../stores/CreditCollectionNftsPageStore';

type Props = {
    appStore?: AppStore
    creditCollectionNftsPageStore?: CreditCollectionNftsPageStore,
}

function CreditCollectionNftsPage({ appStore, creditCollectionNftsPageStore }: Props) {

    const { collectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        appStore.useLoading(async () => {
            await creditCollectionNftsPageStore.init(collectionId);
        })
    }, []);

    const crumbs = [
        { name: 'My Collections', onClick: () => { navigate(AppRoutes.USER_PROFILE) } },
        { name: 'Create Collection' },
    ]

    return (
        <PageLayoutComponent
            className = { 'PageCreditCollectionNfts' }>
            <PageHeader />
            <div className={'PageContent AppContent'} >
                <Breadcrumbs crumbs={crumbs} />
                {/* <AddNftsStage /> */}
            </div>
            <PageFooter />
        </PageLayoutComponent>

    )
}

export default inject((stores) => stores)(observer(CreditCollectionNftsPage));
