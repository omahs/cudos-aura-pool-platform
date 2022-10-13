import React, { useEffect } from 'react';

import '../styles/page-farm-view-component.css';
import NftPreviewsGrid from '../../../nfts-explore/presentation/components/NftPreviewsGrid';
import ProfileHeader from '../../../collection-details/presentation/components/ProfileHeader';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import FarmViewPageStore from '../stores/FarmViewPageStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import { useParams } from 'react-router-dom';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';

interface Props {
    appStore?: AppStore
    farmViewPageStore?: FarmViewPageStore,
}

function FarmViewPageComponent({ appStore, farmViewPageStore }: Props) {

    const { farmId } = useParams();

    useEffect(() => {
        appStore.useLoading(() => {
            farmViewPageStore.innitiate(farmId, () => {});
        });
    }, []);

    const farm = farmViewPageStore.farmProfile;

    const crumbs = [
        { name: 'Marketplace', onClick: () => {} },
        { name: 'Collection Details', onClick: () => {} },
        { name: `Farm Owner: ${farm ? farm.name : ''}`, onClick: () => {} },
    ]

    return (
        farm === null ? ''
            : <PageLayoutComponent
                className = { 'PageFarmView' } >
                <PageHeader />
                <div className={'PageContent AppContent'} >
                    <Breadcrumbs crumbs={crumbs}/>
                    <ProfileHeader coverPictureUrl={farm.coverImgUrl} profilePictureUrl={farm.profileImgurl} />
                    <div className={'Heading2'}>{farm.name}</div>
                    <div className={'Grid GridColumns2'}>
                        <div className={'FarmDescription'}>{farm.description}</div>
                        <div className={'BorderContainer'}>
                            <div className={'FlexRow FarmInfoRow'}>
                                <div className={'FarmInfoLabel'}>Total Hashrate</div>
                                <div className={'FarmInfoValue'}>102.000 EH/s</div>
                            </div>
                            <div className={'FlexRow FarmInfoRow'}>
                                <div className={'FarmInfoLabel'}>Hashrate (1h average)</div>
                                <div className={'FarmInfoValue'}>80.345 EH/s</div>
                            </div>
                            <div className={'FlexRow FarmInfoRow'}>
                                <div className={'FarmInfoLabel'}>Active Workers</div>
                                <div className={'FarmInfoValue'}>1023</div>
                            </div>
                            <div className={'FlexRow FarmInfoRow'}>
                                <div className={'FarmInfoLabel'}>Collections Owned</div>
                                <div className={'FarmInfoValue'}>2</div>
                            </div>
                            <div className={'FlexRow FarmInfoRow'}>
                                <div className={'FarmInfoLabel'}>NFTs Owned</div>
                                <div className={'FarmInfoValue'}>1400</div>
                            </div>
                            <div className={'FlexRow FarmInfoRow'}>
                                <div className={'FarmInfoLabel'}>Total NFTs Sold</div>
                                <div className={'FarmInfoValue'}>735</div>
                            </div>
                        </div>
                    </div>
                    <div className={'H2'}>Collections Owned</div>
                    <NftPreviewsGrid/>
                </div>
                <PageFooter />
            </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(FarmViewPageComponent));
