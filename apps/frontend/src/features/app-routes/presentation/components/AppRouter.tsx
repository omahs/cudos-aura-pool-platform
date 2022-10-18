import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppRoutes from '../../entities/AppRoutes';

import NotFoundPage from '../../../not-found/presensation/components/NotFoundPage';
import UiKitPage from '../../../ui-kit/presensation/components/UiKitPage';

import '../styles/app-router.css';
import RewardsCalculatorPage from '../../../rewards-calculator/presentation/pages/RewardsCalculatorPage';
import MarketplacePage from '../../../collection/presentation/pages/MarketplacePage';
import ExploreNftsPage from '../../../nft/presentation/pages/ExploreNftsPage';
import NftViewPage from '../../../nft/presentation/pages/NftViewPage';
import CollectionViewPage from '../../../collection/presentation/pages/CollectionViewPage';
import FarmViewPage from '../../../mining-farm/presentation/pages/FarmViewPage';
import UserProfilePage from '../../../accounts/presentation/pages/UserProfilePage';
import { inject, observer } from 'mobx-react';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import ExploreCollectionsPage from '../../../collection/presentation/pages/ExploreCollectionsPage';
import ExploreFarmsPage from '../../../mining-farm/presentation/pages/ExploreFarmsPage';
import AdminPortalPage from '../../../accounts/presentation/pages/AdminPortalPage';

type Props = {
    accountSessionStore?: AccountSessionStore,
}

function AppRouter({ accountSessionStore }: Props) {

    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState('PageTransitionIn');

    useEffect(() => {
        if (location !== displayLocation) {
            setTransistionStage('PageTransitionOut');
        }
    }, [location, displayLocation]);

    function onRouterTransitionEnd() {
        if (transitionStage === 'PageTransitionOut') {
            setTransistionStage('PageTransitionIn');
            setDisplayLocation(location);
        }
    }

    return (
        <div
            className={`AppRouter ${transitionStage}`}
            onAnimationEnd = { onRouterTransitionEnd } >

            { accountSessionStore.isInited() === false && (
                <LoadingIndicator />
            ) }

            { accountSessionStore.isInited() === true && (
                <Routes location = { displayLocation } >
                    <Route path = { AppRoutes.UiKIt } element = { <UiKitPage /> } />
                    <Route path = { AppRoutes.NOT_FOUND } element = { <NotFoundPage /> } />
                    <Route path = { AppRoutes.REWARDS_CALCULATOR } element = { <RewardsCalculatorPage /> } />
                    <Route index = { true } element = { <MarketplacePage /> } />
                    <Route path = { AppRoutes.MARKETPLACE } element = { <MarketplacePage /> } />
                    <Route path = { AppRoutes.EXPLORE_NFTS } element = { <ExploreNftsPage /> } />
                    <Route path = { AppRoutes.EXPLORE_COLLECTIONS } element = { <ExploreCollectionsPage /> } />
                    <Route path = { AppRoutes.EXPLORE_FARMS } element = { <ExploreFarmsPage /> } />
                    <Route path = { AppRoutes.USER_PROFILE } element = { <UserProfilePage /> } />
                    <Route path = { `${AppRoutes.NFT_VIEW}/:nftId` } element = { <NftViewPage /> } />
                    <Route path = { `${AppRoutes.COLLECTION_VIEW}/:collectionId` } element = { <CollectionViewPage /> } />
                    <Route path = { `${AppRoutes.FARM_VIEW}/:farmId` } element = { <FarmViewPage /> } />

                    <Route path = { AppRoutes.ADMIN_PORTAL } element = { <AdminPortalPage /> } />

                </Routes>
            ) }
        </div>
    )
}

export default inject((stores) => stores)(observer(AppRouter));
