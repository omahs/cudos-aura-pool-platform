import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import MiningFarmViewPageStore from '../stores/MiningFarmViewPageStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import EditMiningFarmModal from '../components/EditMiningFarmModal';
import EditMiningFarmModalStore from '../stores/EditMiningFarmModalStore';
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
import Button, { BUTTON_COLOR, BUTTON_PADDING, BUTTON_RADIUS, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import CollectionPreview from '../../../collection/presentation/components/CollectionPreview';
import DataGridLayout from '../../../../core/presentation/components/DataGridLayout';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddIcon from '@mui/icons-material/Add';
import '../styles/page-mining-farm-view-component.css';
import Svg from '../../../../core/presentation/components/Svg';
import SvgGridNoContent from '../../../../core/presentation/vectors/grid-no-content.svg';

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

    function onClickCreateCollection() {
        navigate(AppRoutes.PAGE_CREATE_COLLECTION);
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
                    <div className={'CollectionsOwnedHeader FlexRow'}>
                        <div className={'H2'}>Collections Owned</div>
                        <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}>
                            <Button
                                radius={BUTTON_RADIUS.RADIUS_16}
                                onClick={onClickCreateCollection}
                            >
                                <Svg svg={AddIcon}/>
                                Create Collection
                            </Button>
                        </Actions>
                    </div>
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
                                defaultContent={<EmptyGridContent/>} >
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

    function EmptyGridContent() {
        return (
            <div className={'NoContentFound FlexColumn'}>
                <Svg svg={SvgGridNoContent} />
                <div className={'H3 Bold'}>No collections in here</div>
                <div className={'B1'}>Looks like you haven’t created collections yet.</div>
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_CENTER}
                    height={ACTIONS_HEIGHT.HEIGHT_48}
                >
                    <Button
                        onClick={onClickCreateCollection}
                        radius={BUTTON_RADIUS.RADIUS_16}>
                        <Svg svg={AddIcon} />
                        Create First Collection
                    </Button>
                </Actions>
            </div>
        )
    }
}

export default inject((stores) => stores)(observer(MiningFarmViewPage));
