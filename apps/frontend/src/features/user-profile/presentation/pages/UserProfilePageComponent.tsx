import React, { useEffect } from 'react';

import '../styles/page-user-profile-component.css';
import ProfileHeader from '../../../collection-details/presentation/components/ProfileHeader';
import AppStore from '../../../../core/presentation/stores/AppStore';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import UserProfilePageStore, { PROFILE_PAGES } from '../stores/UserProfilePageStore';
import S from '../../../../../src/core/utilities/Main';
import UserProfileNfts from '../components/UserProfileNfts';
import { Header } from '@nestjs/common';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import { useParams } from 'react-router-dom';

interface Props {
    appStore?: AppStore

    userProfilePageStore?: UserProfilePageStore,
}

function UserProfilePageComponent({ appStore, userProfilePageStore }: Props) {
    const { userAddress } = useParams();

    useEffect(() => {
        appStore.incrementLoading();

        userProfilePageStore.innitiate(userAddress, () => {
            appStore.decrementLoading();
        });
    }, [])

    const userProfile = userProfilePageStore.userProfileModel;

    return (userProfile === null ? ''
        : <PageLayoutComponent
            className = { 'PageUserProfile' }
            modals = { [
            ] } >
            <PageHeader />
            <div className={'PageContent'} >
                <ProfileHeader coverPictureUrl={userProfile.coverImgUrl} profilePictureUrl={userProfile.profileImgurl} />
                <div className={'ProfileHeaderDataRow FlexRow FlexGrow'}>
                    <div className={'FlexColumn LeftSide'}>
                        <div className={'H2 Bold'}>{userProfile.name}</div>
                        <div className={'FlexRow InfoBelowUserName'}>
                            <div className={'Addrees'}>{userProfile.address}</div>
                            {/* TODO: display date correctly */}
                            <div className={'JoinDate B3'}>{userProfile.timestampJoined}</div>
                        </div>
                    </div>
                    <div className={'FlexRow RightSide'}>
                        <div className={'BorderContainer FlexColumn'}>
                            <div className={'FlexRow BtcEarned'}>
                                <div className={'FlexRow BtcValueRow'}>
                                    <div className={'H2 Bold'}>{userProfile.totalBtcEarned.toFixed(3)}</div>
                                    <div className={'B1 SemiBold'}>BTC</div>
                                </div>
                                <div className={'B3 SemiBold Gray'}>${userProfile.totalBtcEarned.multipliedBy(userProfilePageStore.bitcoinPrice).toFixed(3)}</div>
                            </div>
                            <div className={'B3 Bold Gray'}>BTC Earned</div>
                        </div>
                        <div className={'BorderContainer FlexColumn'}>
                            <div className={'FlexRow TotalHash'}>
                                <div className={'H2 Bold'}>{userProfile.totalHashPower}</div>
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
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(UserProfilePageComponent));
