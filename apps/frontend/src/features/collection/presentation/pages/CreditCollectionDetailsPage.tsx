import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import PageAdminHeader from '../../../header/presentation/components/PageAdminHeader';

import '../styles/page-credit-collection-details-page.css';
import BorderShadowPaddingContainer from '../../../../core/presentation/components/BorderShadowPaddingContainer';
import { useNavigate, useParams } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import CollectionDetailsForm from '../components/credit-collection/CollectionDetailsForm';
import NftCreditSidePreview from '../components/credit-collection/NftCreditSidePreview';
import AddNftsForm from '../components/credit-collection/AddNftsForm';
import FinishCreditForm from '../components/credit-collection/FinishCreditForm';
import NavRow from '../../../../core/presentation/components/NavRow';
import CollectionAddNftsTable from '../components/credit-collection/CollectionAddNftsTable';
import CreditCollectionStore from '../stores/CreditCollectionStore';
import CreditCollectionSuccessModal from '../components/credit-collection/CreditCollectionSuccessModal';
import AppStore from '../../../../core/presentation/stores/AppStore';

enum CreditCollectionDetailsSteps {
    COLLECTION_DETAILS = 1,
    ADD_NFTS = 2,
    FINISH = 3,
}

type Props = {
    creditCollectionStore?: CreditCollectionStore;
    appStore?: AppStore;
}

function CreditCollectionDetailsPage({ creditCollectionStore, appStore }: Props) {
    const { collectionId } = useParams();
    const [step, setStep] = useState(CreditCollectionDetailsSteps.COLLECTION_DETAILS);

    useEffect(() => {
        appStore.useLoading(async () => {
            await creditCollectionStore.fetch(collectionId);
        })
    }, []);

    const navigate = useNavigate();

    const crumbs = [
        { name: 'My Collections', onClick: () => { navigate(AppRoutes.USER_PROFILE) } },
        { name: 'Create Collection' },
    ]

    const navSteps = [
        {
            navNumber: 1,
            navName: 'Collection Details',
            isActive: step === CreditCollectionDetailsSteps.COLLECTION_DETAILS,
        },
        {
            navNumber: 2,
            navName: 'Add NFTs',
            isActive: step === CreditCollectionDetailsSteps.ADD_NFTS,
        },
        {
            navNumber: 3,
            navName: 'Finish',
            isActive: step === CreditCollectionDetailsSteps.FINISH,
        },
    ]

    return (
        <PageLayoutComponent
            modals = {
                <>
                    <CreditCollectionSuccessModal />
                </>
            }
            className = { 'PageCreditCollectionDetailsPage' }>

            <PageAdminHeader />

            <div className = { 'PageContent AppContent' } >
                <Breadcrumbs crumbs={crumbs} />
                <BorderShadowPaddingContainer>
                    {creditCollectionStore.collectionEntity !== null
                        && (<>
                            <div className={'Grid FormAndPreviewContainer'}>
                                <div className={'FormContainer FlexColumn'}>
                                    <NavRow navSteps={navSteps} />

                                    {step === CreditCollectionDetailsSteps.COLLECTION_DETAILS && (
                                        <CollectionDetailsForm />
                                    )}
                                    {step === CreditCollectionDetailsSteps.ADD_NFTS && (
                                        <AddNftsForm />
                                    )}
                                    {step === CreditCollectionDetailsSteps.ADD_NFTS && (
                                        <FinishCreditForm />
                                    )}
                                </div>
                                <NftCreditSidePreview />
                            </div>
                            {step === CreditCollectionDetailsSteps.ADD_NFTS && (
                                <CollectionAddNftsTable />
                            )}
                        </>)}
                </BorderShadowPaddingContainer>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(CreditCollectionDetailsPage));
