/* global TR */

import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import LaunchIcon from '@mui/icons-material/Launch';
import '../styles/page-collection-view-component.css';
import NftPreviewsGrid from '../../../nfts-explore/presentation/components/NftPreviewsGrid';
import ProfileHeader from '../components/ProfileHeader';
import ProjectUtils from '../../../../core/utilities/ProjectUtils';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import CollectionViewPageStore from '../stores/CollectionViewPageStore';
import { useParams } from 'react-router-dom';
import Svg from '../../../../core/presentation/components/Svg';
import NftPreviewsGridStore from '../../../nfts-explore/presentation/stores/NftPreviewsGridStore';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';

type Props = {
    collectionViewPageStore?: CollectionViewPageStore
    nftPreviewsGridStore?: NftPreviewsGridStore
}

function CollectionViewPageComponent({ collectionViewPageStore, nftPreviewsGridStore }: Props) {

    const collectionProfile = collectionViewPageStore.collectionProfile;
    const { collectionId } = useParams();

    useEffect(() => {
        collectionViewPageStore.innitiate(collectionId, nftPreviewsGridStore);
    }, []);

    // TODO: get crumbs from router
    const crumbs = [
        { name: 'Marketplace', onClick: () => {} },
        { name: 'Collection Details', onClick: () => {} },
    ]

    return (
        <PageLayoutComponent
            className = { 'PageCollectionView' }>
            <PageHeader />

            { collectionProfile === null && (
                <LoadingIndicator />
            ) }

            { collectionProfile !== null && (
                <div className={'PageContent AppContent'} >
                    <Breadcrumbs crumbs={crumbs} />
                    <ProfileHeader coverPictureUrl={collectionProfile.coverImgUrl} profilePictureUrl={collectionProfile.profileImgurl} />
                    <div className={'Heading2 CollectionHeadingName'}>{collectionProfile.name}</div>
                    <div className={'ProfileInfo Grid'}>
                        <div className={'FlexColumn'}>
                            <div>Farm Owner <b>{collectionProfile.farmName}</b></div>
                            <div className={'CollectionDescription'}>{collectionProfile.description}</div>
                        </div>
                        {/* // TODO: fill correct values */}
                        <div className={'FlexColumn InfoBox'}>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Floor</div>
                                <div className={'CollectionInfoValue'}>{collectionProfile.priceDisplay()} CUDOS</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Volume</div>
                                <div className={'CollectionInfoValue'}>{collectionProfile.volume.toFixed(1)} CUDOS</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Items</div>
                                <div className={'CollectionInfoValue'}>{collectionProfile.items}</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Owners</div>
                                <div className={'CollectionInfoValue'}>{collectionProfile.owners}</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Total Hashing Power</div>
                                <div className={'CollectionInfoValue'}>{collectionProfile.hashRateDisplay()}</div>
                            </div>
                            <div className={'HorizontalSeparator'}></div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Blockchain</div>
                                <div className={'CollectionInfoValue'}>CUDOS</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Address</div>
                                <div className={'CollectionInfoValue'}>
                                    {collectionProfile.ownerAddress}
                                    <Svg svg={LaunchIcon}
                                        className={'SVG Icon Clickable '}
                                        onClick={() => ProjectUtils.copyText(collectionProfile.ownerAddress)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <NftPreviewsGrid />
                </div>
            ) }
            <PageFooter />
        </PageLayoutComponent>

    )
}

export default inject((stores) => stores)(observer(CollectionViewPageComponent));
