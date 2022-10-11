/* global TR */

import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import AlertStore from '../../../common/js/stores/AlertStore';
import PopupConnectWalletsStore from '../../../common/js/stores/PopupConnectWalletsStore';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import PageHeader from '../components-inc/PageHeader';
import PageFooter from '../components-inc/PageFooter';
import S from '../../../common/js/utilities/Main';

import SvgCopy from '../../../common/svg/copy.svg';
import './../../css/components-pages/page-collection-view-component.css';
import NftPreviewsGrid from '../components-inc/NftPreviewsGrid';
import ProfileHeader from '../../../common/js/components-inc/ProfileHeader';
import ProjectUtils from '../../../common/js/ProjectUtils';
import Breadcrumbs from '../components-inc/Breadcrumbs';
import CollectionProfile from '../../../common/js/models/CollectionProfile';
import CollectionsApi from '../../../common/js/api/CollectionsApi';
import PageLayoutComponent from 'apps/frontend/src/core/presentation/components/PageLayoutComponent';
import CollectionViewPageStore from '../stores/CollectionViewPageStore';

interface Props extends ContextPageComponentProps {
    collectionViewPageStore?: CollectionViewPageStore
}

function CollectionViewPageComponent({collectionViewPageStore}: Props) {

    // TODO: get id from path
    useEffect(
        () => { 
            collectionViewPageStore.innitiate("1");
        });
            nftDetailsStore.innitiate(nftId);
        },
        [],
    );

        const collectionProfile = this.state.collectionProfile;

        // TODO: get crumbs from router
        const crumbs = [
            { name: 'Marketplace', onClick: () => {} },
            { name: 'Collection Details', onClick: () => {} },
        ]

        return (
            collectionProfile === null ? ''
                :<PageLayoutComponent
                className = { 'PageCollectionView' }
                modals = { [
                ] } >
                <div className={'PageContent'} >
                    <PageHeader />
                    <Breadcrumbs crumbs={crumbs} onClickback={() => {}}/>
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
                                    <div
                                        className={'SVG Icon Pointer '}
                                        dangerouslySetInnerHTML={{ __html: SvgCopy }}
                                        onClick={() => ProjectUtils.copyText(collectionProfile.ownerAddress)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <NftPreviewsGrid
                    />
                    <PageFooter />
                </div>
                </PageLayoutComponent> 

        )
    }
}

export default inject((stores) => stores)(observer(CollectionViewPageComponent));
