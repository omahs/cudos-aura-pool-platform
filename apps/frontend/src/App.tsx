import React, { useEffect, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import S from './core/utilities/Main';

import AppStore from './core/presentation/stores/AppStore';

import AppRouter from './features/app-routes/presentation/components/AppRouter';
import AlertStore from './core/presentation/stores/AlertStore';
import RewardsCalculatorStore from './features/rewards-calculator/presentation/stores/RewardsCalculatorStore';
import BitcoinStorageRepo from './features/bitcoin-data/data/repo/BitcoinStorageRepo';
import MiningFarmStorageRepo from './features/mining-farm/data/repo/MiningFarmStorageRepo';
import CollectionStorageRepo from './features/marketplace-collections/data/repo/CollectionStorageRepo';
import ExploreCollectionsStore from './features/marketplace-collections/presentation/stores/ExploreCollectionsStore';
import NftPreviewsGridStore from './features/explore-nfts/presentation/stores/NftPreviewsGridStore';
import NftStorageRepo from './features/explore-nfts/data/repo/NftStorageRepo';

const appStore = new AppStore();
const alertStore = new AlertStore();

const bitcoinRepo = new BitcoinStorageRepo();
const miningFarmRepo = new MiningFarmStorageRepo();
const collectionRepo = new CollectionStorageRepo();
const nftRepo = new NftStorageRepo(collectionRepo);

const rewardsCalculatorStore = new RewardsCalculatorStore(bitcoinRepo, miningFarmRepo);
const exploreCollectionsStore = new ExploreCollectionsStore(collectionRepo);
const nftPreviewsGridStore = new NftPreviewsGridStore(nftRepo, collectionRepo);

const App = () => {

    useEffect(() => {
        initHover();
        initOnBeforeUnload();
        removeInitalPageLoading();
    }, []);

    return (
        <StrictMode>
            <Provider
                appStore = { appStore }
                alertStore = { alertStore }
                rewardsCalculatorStore = { rewardsCalculatorStore }
                exploreCollectionsStore = { exploreCollectionsStore }
                nftPreviewsGridStore = { nftPreviewsGridStore }>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </Provider>
        </StrictMode>
    );

}

export default App;

function initHover() {
    if (navigator.maxTouchPoints === 0 || navigator.msMaxTouchPoints === 0) {
        return;
    }

    let touch = false;
    let timerId: any = null;
    const timerCallback = () => {
        touch = false;
    };

    document.documentElement.addEventListener('mousemove', (e) => {
        if (touch === false) { S.CSS.removeClass(document.documentElement, 'Touchable'); }
    }, true);

    document.documentElement.addEventListener('touchstart', () => {
        touch = true;
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        S.CSS.addClass(document.documentElement, 'Touchable');
    }, true);

    document.documentElement.addEventListener('touchend', () => {
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(timerCallback, 256);
    });
}

function initOnBeforeUnload() {
    let loadedFromCache = false;

    window.onbeforeunload = (e: BeforeUnloadEvent) => {
        const defaultReturnValue = e.returnValue;

        if (S.Browser.instance_name === S.Browser.SAFARI) {
            document.body.style.opacity = '0';
        }

        if (loadedFromCache === true) {
            e.returnValue = defaultReturnValue;
            return;
        }

        if (e.returnValue !== defaultReturnValue) {
            setTimeout(() => {
                setTimeout(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            setTimeout(() => {
                                if (S.Browser.instance_name === S.Browser.SAFARI) {
                                    document.body.style.opacity = '1';
                                }
                            }, 20);
                        }, 20);
                    }, 20);
                }, 20);
            }, 20);
        }
    };

    window.onpageshow = (e: PageTransitionEvent) => {
        loadedFromCache = e.persisted;
        if (e.persisted) {
            window.location.reload();
        }
    };
}

function removeInitalPageLoading() {
    const pageLoadingN = document.getElementById('page_loading');
    pageLoadingN?.parentNode?.removeChild(pageLoadingN);
}
