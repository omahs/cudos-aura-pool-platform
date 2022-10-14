import React, { useEffect } from 'react';

import '../styles/page-user-profile-component.css';
import ProfileHeader from '../../../collection/presentation/components/ProfileHeader';
import AppStore from '../../../../core/presentation/stores/AppStore';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import UserProfilePageStore, { PROFILE_PAGES } from '../stores/UserProfilePageStore';
import S from '../../../../../src/core/utilities/Main';
import UserProfileNfts from '../components/UserProfileNfts';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';

interface Props {
    appStore?: AppStore

    userProfilePageStore?: UserProfilePageStore,
}

function UserProfilePage({ appStore, userProfilePageStore }: Props) {
    const { userAddress } = useParams();

    useEffect(() => {
        appStore.useLoading(() => {
            userProfilePageStore.init(userAddress);
        })
    }, [])

    const userEntity = userProfilePageStore.userEntity;

    return (
        <PageLayoutComponent
            className = { 'PageUserProfile' }>
            <PageHeader />

            { userEntity === null && (
                <LoadingIndicator />
            ) }

            { userEntity !== null && (
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
                                    <div className={'B3 SemiBold Gray'}>${userEntity.totalBtcEarned.multipliedBy(userProfilePageStore.bitcoinPrice).toFixed(3)}</div>
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
                            <div onClick={() => userProfilePageStore.setProfilePage(PROFILE_PAGES.NFTS)} className={`NavButton Clickable ${S.CSS.getActiveClassName(userProfilePageStore.profilePage === PROFILE_PAGES.NFTS)}`}>My NFTs</div>
                            <div onClick={() => userProfilePageStore.setProfilePage(PROFILE_PAGES.EARNINGS)} className={`NavButton Clickable ${S.CSS.getActiveClassName(userProfilePageStore.profilePage === PROFILE_PAGES.EARNINGS)}`}>Earnings Info</div>
                            <div onClick={() => userProfilePageStore.setProfilePage(PROFILE_PAGES.HISTORY)} className={`NavButton Clickable ${S.CSS.getActiveClassName(userProfilePageStore.profilePage === PROFILE_PAGES.HISTORY)}`}>History</div>
                        </div>
                    </div>
                    {userProfilePageStore.profilePage === PROFILE_PAGES.NFTS
                        ? <UserProfileNfts userProfilePageStore={userProfilePageStore}/> : ''}
                </div>
            ) }

            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(UserProfilePage));
