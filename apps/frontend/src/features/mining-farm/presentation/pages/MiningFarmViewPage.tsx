import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import MiningFarmViewPageStore from '../stores/MiningFarmViewPageStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import CollectionFilterModel from '../../../collection/utilities/CollectionFilterModel';

import { MenuItem } from '@mui/material';
import ProfileHeader from '../../../collection/presentation/components/ProfileHeader';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import Select from '../../../../core/presentation/components/Select';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import CollectionPreview from '../../../collection/presentation/components/CollectionPreview';
import DataGridLayout from '../../../../core/presentation/components/DataGridLayout';

import '../styles/page-mining-farm-view-component.css';

type Props = {
    appStore?: AppStore
    miningFarmViewPageStore?: MiningFarmViewPageStore,
}

function MiningFarmViewPage({ appStore, miningFarmViewPageStore }: Props) {

    const { farmId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        appStore.useLoading(async () => {
            await miningFarmViewPageStore.init(farmId);
        });
    }, []);

    const miningFarmEntity = miningFarmViewPageStore.miningFarmEntity;
    const collectionFilterModel = miningFarmViewPageStore.collectionFilterModel;

    const crumbs = [
        { name: 'Marketplace', onClick: () => { navigate(AppRoutes.MARKETPLACE) } },
        { name: 'Explore Farms', onClick: () => { navigate(AppRoutes.EXPLORE_MINING_FARMS) } },
        { name: `Farm Owner: ${miningFarmEntity?.name ?? ''}`, onClick: () => {} },
    ]

    return (
        <PageLayoutComponent
            className = { 'PageMiningFarmView' } >
            <PageHeader />

            { miningFarmEntity === null && (
                <LoadingIndicator />
            ) }

            { miningFarmEntity !== null && (
                <div className={'PageContent AppContent'} >
                    <Breadcrumbs crumbs={crumbs}/>
                    <ProfileHeader coverPictureUrl={miningFarmEntity.coverImgUrl} profilePictureUrl={miningFarmEntity.profileImgurl} />
                    <div className={'H2'}>{miningFarmEntity.name}</div>
                    <div className={'Grid GridColumns2'}>
                        <div className={'FarmDescription'}>{miningFarmEntity.description}</div>
                        <div className={'BorderContainer'}>
                            {/* TODO: use real data */}
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

                    <DataGridLayout
                        header = { (
                            <>
                                <Select
                                    onChange={miningFarmViewPageStore.onChangeSortKey}
                                    value={collectionFilterModel.sortKey} >
                                    <MenuItem value = { CollectionFilterModel.SORT_KEY_NAME } > Name </MenuItem>
                                    <MenuItem value = { CollectionFilterModel.SORT_KEY_PRICE } > Price </MenuItem>
                                </Select>
                                <Actions
                                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_RIGHT}
                                    height={ACTIONS_HEIGHT.HEIGHT_48} >
                                    {/* TODO: show all filters */}
                                    <Button
                                        padding={BUTTON_PADDING.PADDING_24}
                                        type={BUTTON_TYPE.ROUNDED} >
                                    All Filters
                                    </Button>
                                </Actions>
                            </>
                        ) }>

                        { miningFarmViewPageStore.collectionEntities === null && (
                            <LoadingIndicator />
                        ) }

                        { miningFarmViewPageStore.collectionEntities !== null && (
                            <GridView
                                gridViewState={miningFarmViewPageStore.gridViewState}
                                defaultContent={<div className={'NoContentFound'}>No Nfts found</div>} >
                                { miningFarmViewPageStore.collectionEntities.map((collectionEntity: CollectionEntity, index: number) => {
                                    return (
                                        <CollectionPreview
                                            key={index}
                                            collectionEntity={collectionEntity}
                                            miningFarmName={miningFarmViewPageStore.getMiningFarmName(collectionEntity.farmId)} />
                                    )
                                }) }
                            </GridView>
                        ) }

                    </DataGridLayout>
                </div>
            ) }

            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(MiningFarmViewPage));
