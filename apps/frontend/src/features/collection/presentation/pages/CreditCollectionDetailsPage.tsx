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
import CollectionCreditSidePreview, { CollectionCreditSidePreviewSize } from '../components/credit-collection/CollectionCreditSidePreview';
import AddNftsForm from '../components/credit-collection/AddNftsForm';
import FinishCreditForm from '../components/credit-collection/FinishCreditForm';
import NavRow from '../../../../core/presentation/components/NavRow';
import CollectionAddNftsTable from '../components/credit-collection/CollectionAddNftsTable';
import CreditCollectionStore from '../stores/CreditCollectionStore';
import CreditCollectionSuccessModal from '../components/credit-collection/CreditCollectionSuccessModal';
import AppStore from '../../../../core/presentation/stores/AppStore';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';

enum CreditCollectionDetailsSteps {
    COLLECTION_DETAILS = 1,
    ADD_NFTS = 2,
    FINISH = 3,
}

type Props = {
    creditCollectionStore?: CreditCollectionStore;
    appStore?: AppStore;
    bitcoinStore?: BitcoinStore;
}

function CreditCollectionDetailsPage({ creditCollectionStore, appStore, bitcoinStore }: Props) {
    const { collectionId } = useParams();
    const [step, setStep] = useState(CreditCollectionDetailsSteps.ADD_NFTS);

    useEffect(() => {
        appStore.useLoading(async () => {
            await creditCollectionStore.init(collectionId);
            await bitcoinStore.init();
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
                                    <NavRow className={'FormNav'} navSteps={navSteps} />

                                    {step === CreditCollectionDetailsSteps.COLLECTION_DETAILS && (
                                        <CollectionDetailsForm onClickNextStep={() => setStep(CreditCollectionDetailsSteps.ADD_NFTS)} />
                                    )}
                                    {step === CreditCollectionDetailsSteps.ADD_NFTS && (
                                        <AddNftsForm
                                            onClickBack={() => setStep(CreditCollectionDetailsSteps.COLLECTION_DETAILS)}
                                            onClickNextStep={() => setStep(CreditCollectionDetailsSteps.FINISH)}/>
                                    )}
                                    {step === CreditCollectionDetailsSteps.FINISH && (
                                        <FinishCreditForm />
                                    )}
                                </div>
                                {step === CreditCollectionDetailsSteps.COLLECTION_DETAILS && (
                                    <CollectionCreditSidePreview size={CollectionCreditSidePreviewSize.SMALL}/>
                                )}
                                {step === CreditCollectionDetailsSteps.ADD_NFTS && (
                                    <CollectionCreditSidePreview />
                                )}
                                {step === CreditCollectionDetailsSteps.FINISH && (
                                    <CollectionCreditSidePreview />
                                )}
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
