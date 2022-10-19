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
import Button, { BUTTON_COLOR, BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import CollectionPreview from '../../../collection/presentation/components/CollectionPreview';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import '../styles/page-mining-farm-view-component.css';
import Svg from '../../../../core/presentation/components/Svg';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import EditMiningFarmModal from '../components/EditMiningFarmModal';
import EditMiningFarmModalStore from '../stores/EditMiningFarmModalStore';

type Props = {
    appStore?: AppStore
    miningFarmViewPageStore?: MiningFarmViewPageStore,
    accountSessionStore?: AccountSessionStore
    editMiningFarmModalStore?: EditMiningFarmModalStore
}

function MiningFarmViewPage({ appStore, miningFarmViewPageStore, accountSessionStore, editMiningFarmModalStore }: Props) {
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

    function onClickEditProfile() {
        editMiningFarmModalStore.showSignal(miningFarmEntity);
    }

    return (
        <PageLayoutComponent
            modals = {
                <>
                    <EditMiningFarmModal />
                </>
            }
            className = { 'PageMiningFarmView' } >
            <PageHeader />

            { miningFarmEntity === null && (
                <LoadingIndicator />
            ) }

            { miningFarmEntity !== null && (
                <div className={'PageContent AppContent'} >
                    <Breadcrumbs crumbs={crumbs}/>
                    <ProfileHeader coverPictureUrl={miningFarmEntity.coverImgUrl} profilePictureUrl={miningFarmEntity.profileImgUrl} />

                    {accountSessionStore.isAdmin() === true
                        && accountSessionStore.accountEntity.accountId === miningFarmEntity.accountId
                        && (<Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_RIGHT}>
                            <Button
                                onClick={onClickEditProfile}
                                color={BUTTON_COLOR.SCHEME_3}
                            >
                                <Svg svg={BorderColorIcon} />
                                Edit Profile
                            </Button>
                        </Actions>)}
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
                    <div className={'DataGridWrapper'}>
                        <div className={'Grid FilterHeader'}>
                            <Select
                                className={'SortBySelect'}
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
                        </div>

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
                    </div>
                </div>
            ) }

            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(MiningFarmViewPage));
