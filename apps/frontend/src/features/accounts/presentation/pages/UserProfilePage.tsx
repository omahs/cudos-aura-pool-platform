import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../../src/core/utilities/Main';
import AccountSessionStore from '../stores/AccountSessionStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import UserProfilePageStore from '../stores/UserProfilePageStore';
import NftEntity from '../../../nft/entities/NftEntity';
import BitcoinStore from '../../../bitcoin-data/presentation/stores/BitcoinStore';
import NftFilterModel from '../../../nft/utilities/NftFilterModel';

import { MenuItem } from '@mui/material';
import ProfileHeader from '../../../collection/presentation/components/ProfileHeader';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import Select from '../../../../core/presentation/components/Select';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import NftPreview from '../../../nft/presentation/components/NftPreview';

import '../styles/page-user-profile-component.css';

type Props = {
    appStore?: AppStore
    bitcoinStore?: BitcoinStore;
    accountSessionStore?: AccountSessionStore;
    userProfilePageStore?: UserProfilePageStore,
}

function UserProfilePage({ appStore, bitcoinStore, userProfilePageStore, accountSessionStore }: Props) {
    useEffect(() => {
        appStore.useLoading(async () => {
            await bitcoinStore.init();
            await userProfilePageStore.init();
        })
    }, [])

    const userEntity = accountSessionStore.userEntity;
    const nftFilterModel = userProfilePageStore.nftFilterModel;

    return (
        <PageLayoutComponent
            className = { 'PageUserProfile' }>
            <PageHeader />

            <div className={'PageContent AppContent'} >
                <ProfileHeader coverPictureUrl={userEntity.coverImgUrl} profilePictureUrl={userEntity.profileImgurl} />
                <div className={'ProfileHeaderDataRow FlexRow FlexGrow'}>
                    <div className={'FlexColumn LeftSide'}>
                        <div className={'H2 Bold'}>{userEntity.name}</div>
                        <div className={'FlexRow InfoBelowUserName'}>
                            <div className={'Addrees'}>{userEntity.address}</div>
                            {/* TODO: display date correctly */}
                            <div className={'JoinDate B3'}>{userEntity.timestampJoined}</div>
                        </div>
                    </div>
                    <div className={'FlexRow RightSide'}>
                        <div className={'BorderContainer FlexColumn'}>
                            <div className={'FlexRow BtcEarned'}>
                                <div className={'FlexRow BtcValueRow'}>
                                    <div className={'H2 Bold'}>{userEntity.totalBtcEarned.toFixed(3)}</div>
                                    <div className={'B1 SemiBold'}>BTC</div>
                                </div>
                                <div className={'B3 SemiBold Gray'}>${userEntity.totalBtcEarned.multipliedBy(bitcoinStore.getBitcoinPrice()).toFixed(3)}</div>
                            </div>
                            <div className={'B3 Bold Gray'}>BTC Earned</div>
                        </div>
                        <div className={'BorderContainer FlexColumn'}>
                            <div className={'FlexRow TotalHash'}>
                                <div className={'H2 Bold'}>{userEntity.totalHashPower}</div>
                                <div className={'B1 SemiBold'}> TH/s</div>
                            </div>
                            <div className={'B3 Bold Gray'}>TOTAL CONTRACT HASH POWER</div>
                        </div>
                    </div>
                </div>
                <div className={'FlexRow ProfileNavHolder'}>
                    <div className={'ProfileNav FlexRow B3 SemiBold'}>
                        <div onClick={userProfilePageStore.markNftPage} className={`NavButton Clickable ${S.CSS.getActiveClassName(userProfilePageStore.isNftPage())}`}>My NFTs</div>
                        <div onClick={userProfilePageStore.markEarningsPage} className={`NavButton Clickable ${S.CSS.getActiveClassName(userProfilePageStore.isEarningsPage())}`}>Earnings Info</div>
                        <div onClick={userProfilePageStore.markHistoryPage} className={`NavButton Clickable ${S.CSS.getActiveClassName(userProfilePageStore.isHistoryPage())}`}>History</div>
                    </div>
                </div>
                {userProfilePageStore.isNftPage() === true && (
                    <div className={'DataGridWrapper'}>
                        <div className={'Grid FilterHeader'}>
                            <Select
                                onChange={userProfilePageStore.onChangeSortKey}
                                value={nftFilterModel.sortKey} >
                                <MenuItem value = { NftFilterModel.SORT_KEY_NAME }> Name </MenuItem>
                                <MenuItem value = { NftFilterModel.SORT_KEY_PRICE }> Price </MenuItem>
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

                        { userProfilePageStore.nftEntities === null && (
                            <LoadingIndicator />
                        ) }

                        { userProfilePageStore.nftEntities !== null && (
                            <GridView
                                gridViewState={userProfilePageStore.gridViewState}
                                defaultContent={<div className={'NoContentFound'}>No Nfts found</div>} >
                                {userProfilePageStore.nftEntities.map((nftEntity: NftEntity) => {
                                    return (
                                        <NftPreview
                                            key={nftEntity.id}
                                            nftEntity={nftEntity}
                                            collectionName={userProfilePageStore.getCollectionName(nftEntity.collectionId)} />
                                    )
                                })}
                            </GridView>
                        ) }
                    </div>
                ) }
            </div>

            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(UserProfilePage));
