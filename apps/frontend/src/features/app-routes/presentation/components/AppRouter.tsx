import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppRoutes from '../../entities/AppRoutes';

import NotFoundPage from '../../../not-found/presensation/components/NotFoundPage';
import UiKitPage from '../../../ui-kit/presensation/components/UiKitPage';

import '../styles/app-router.css';
import RewardsCalculatorPageComponent from '../../../rewards-calculator/presentation/pages/RewardsCalculatorPageComponent';
import ExploreCollectionsPageComponent from '../../../collections-marketplace/presentation/pages/ExploreCollectionsPageComponent';
import ExploreNftsPageComponent from '../../../nfts-explore/presentation/pages/ExploreNftsPageComponent';
import NftViewPageComponent from '../../../nft-details/presentation/pages/NftViewPageComponent';
import CollectionViewPageComponent from '../../../collection-details/presentation/pages/CollectionViewPageComponent';
import FarmViewPageComponent from '../../../mining-farm-view/presentation/pages/FarmViewPageComponent';
import UserProfilePageComponent from '../../../user-profile/presentation/pages/UserProfilePageComponent';

export default function AppRouter() {

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
            <Routes location = { displayLocation } >
                <Route path = { AppRoutes.UiKIt } element = { <UiKitPage /> } />
                <Route path = { AppRoutes.NOT_FOUND } element = { <NotFoundPage /> } />
                <Route path = { AppRoutes.REWARDS_CALCULATOR } element = { <RewardsCalculatorPageComponent /> } />
                <Route index = { true } element = { <ExploreCollectionsPageComponent /> } />
                <Route path = { AppRoutes.EXPLORE_COLLECTIONS } element = { <ExploreCollectionsPageComponent /> } />
                <Route path = { AppRoutes.EXPLORE_NFTS } element = { <ExploreNftsPageComponent /> } />
                <Route path = { `${AppRoutes.USER_PROFILE}/:userAddress` } element = { <UserProfilePageComponent /> } />
                <Route path = { `${AppRoutes.NFT_VIEW}/:nftId` } element = { <NftViewPageComponent /> } />
                <Route path = { `${AppRoutes.COLLECTION_VIEW}/:collectionId` } element = { <CollectionViewPageComponent /> } />
                <Route path = { `${AppRoutes.FARM_VIEW}/:farmId` } element = { <FarmViewPageComponent /> } />
            </Routes>
        </div>
    )
}
