/* global TR */

import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import LaunchIcon from '@mui/icons-material/Launch';
import '../styles/page-collection-view-component.css';
import NftPreviewsGrid from '../../../nft/presentation/components/NftPreviewsGrid';
import ProfileHeader from '../components/ProfileHeader';
import ProjectUtils from '../../../../core/utilities/ProjectUtils';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import CollectionViewPageStore from '../stores/CollectionViewPageStore';
import { useNavigate, useParams } from 'react-router-dom';
import Svg from '../../../../core/presentation/components/Svg';
import NftPreviewsGridStore from '../../../nft/presentation/stores/NftPreviewsGridStore';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

type Props = {
    collectionViewPageStore?: CollectionViewPageStore
    nftPreviewsGridStore?: NftPreviewsGridStore
}

function CollectionViewPage({ collectionViewPageStore, nftPreviewsGridStore }: Props) {

    const collectionEntity = collectionViewPageStore.collectionEntity;
    const miningFarmEntity = collectionViewPageStore.miningFarmEntity;

    const { collectionId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        collectionViewPageStore.init(collectionId, nftPreviewsGridStore);
    }, []);

    // TODO: get crumbs from router
    const crumbs = [
        { name: 'Marketplace', onClick: () => { navigate(AppRoutes.MARKETPLACE) } },
        { name: 'Collection Details', onClick: () => {} },
    ]

    function onClickFarmLink() {
        navigate(`${AppRoutes.FARM_VIEW}/${miningFarmEntity.id}`)
    }

    return (
        <PageLayoutComponent
            className = { 'PageCollectionView' }>
            <PageHeader />

            { collectionEntity === null && (
                <LoadingIndicator />
            ) }

            { collectionEntity !== null && (
                <div className={'PageContent AppContent'} >
                    <Breadcrumbs crumbs={crumbs} />
                    <ProfileHeader coverPictureUrl={collectionEntity.coverImgUrl} profilePictureUrl={collectionEntity.profileImgurl} />
                    <div className={'Heading2 CollectionHeadingName'}>{collectionEntity.name}</div>
                    <div className={'ProfileInfo Grid'}>
                        <div className={'FlexColumn B1'}>
                            <div className={'Clickable'} onClick={onClickFarmLink}>Farm Owner:  <b>{miningFarmEntity.name}</b></div>
                            <div className={'CollectionDescription'}>{collectionEntity.description}</div>
                        </div>
                        {/* // TODO: fill correct values */}
                        <div className={'FlexColumn InfoBox'}>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Floor</div>
                                <div className={'CollectionInfoValue'}>{collectionEntity.priceDisplay()} CUDOS</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Volume</div>
                                <div className={'CollectionInfoValue'}>{collectionEntity.volume.toFixed(1)} CUDOS</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Items</div>
                                <div className={'CollectionInfoValue'}>{collectionEntity.items}</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Owners</div>
                                <div className={'CollectionInfoValue'}>{collectionEntity.owners}</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Total Hashing Power</div>
                                <div className={'CollectionInfoValue'}>{collectionEntity.hashRateDisplay()}</div>
                            </div>
                            <div className={'HorizontalSeparator'}></div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Blockchain</div>
                                <div className={'CollectionInfoValue'}>CUDOS</div>
                            </div>
                            <div className={'FlexRow CollectionInfoRow'}>
                                <div className={'CollectionInfoLabel'}>Address</div>
                                <div className={'CollectionInfoValue'}>
                                    {collectionEntity.ownerAddress}
                                    <Svg svg={LaunchIcon}
                                        className={'SVG Icon Clickable '}
                                        onClick={() => ProjectUtils.copyText(collectionEntity.ownerAddress)}
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

export default inject((stores) => stores)(observer(CollectionViewPage));
