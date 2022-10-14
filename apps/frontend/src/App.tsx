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
import CollectionStorageRepo from './features/collection/data/repo/CollectionStorageRepo';
import MarketplaceStore from './features/collection/presentation/stores/MarketplaceStore';
import NftPreviewsGridStore from './features/nft/presentation/stores/NftPreviewsGridStore';
import NftStorageRepo from './features/nft/data/repo/NftStorageRepo';
import ExampleModalStore from './features/ui-kit/presensation/stores/ExampleModalStore';
import CudosStorageRepo from './features/cudos-data/data/repo/CudosStorageRepo';
import NftDetailsStore from './features/nft/presentation/stores/NftDetailsStore';
import CollectionViewPageStore from './features/collection/presentation/stores/CollectionViewPageStore';
import FarmViewPageStore from './features/mining-farm/presentation/stores/FarmViewPageStore';
import UserProfilePageStore from './features/user-profile/presentation/stores/UserProfilePageStore';
import UserStorageRepo from './features/user-profile/data/repo/UserStorageRepo';
import WalletStore from './features/ledger/presentation/stores/WalletStore';
import BuyNftModalStore from './features/nft/presentation/stores/BuyNftModalStore';
import ResellNftModalStore from './features/nft/presentation/stores/ResellNftModalStore';
import StorageHelper from './core/helpers/StorageHelper';
import BitcoinStore from './features/bitcoin-data/presentation/stores/BitcoinStore';
import CudosStore from './features/cudos-data/presentation/stores/CudosStore';

const storageHelper = new StorageHelper();

const appStore = new AppStore();
const alertStore = new AlertStore();
const exampleModalStore = new ExampleModalStore();

const bitcoinRepo = new BitcoinStorageRepo(storageHelper);
const cudosRepo = new CudosStorageRepo(storageHelper);
const miningFarmRepo = new MiningFarmStorageRepo(storageHelper);
const collectionRepo = new CollectionStorageRepo(storageHelper);
const nftRepo = new NftStorageRepo(storageHelper);
const userRepo = new UserStorageRepo(storageHelper);

const bitcoinStore = new BitcoinStore(bitcoinRepo);
const cudosStore = new CudosStore(cudosRepo);
const rewardsCalculatorStore = new RewardsCalculatorStore(bitcoinStore, miningFarmRepo);
const marketplaceStore = new MarketplaceStore(cudosStore, collectionRepo);
const nftPreviewsGridStore = new NftPreviewsGridStore(nftRepo, collectionRepo);
const nftDetailsStore = new NftDetailsStore(bitcoinStore, cudosStore, nftRepo);
const collectionViewPageStore = new CollectionViewPageStore(collectionRepo, miningFarmRepo);
const farmViewPageStore = new FarmViewPageStore(miningFarmRepo, collectionRepo);
const userProfilePageStore = new UserProfilePageStore(bitcoinStore, nftRepo, collectionRepo, userRepo);
const walletStore = new WalletStore();
const buyNftModalStore = new BuyNftModalStore();
const resellNftModalStore = new ResellNftModalStore();

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
                walletStore = { walletStore }
                bitcoinStore = { bitcoinStore }
                cudosStore = { cudosStore }
                exampleModalStore = { exampleModalStore }
                rewardsCalculatorStore = { rewardsCalculatorStore }
                marketplaceStore = { marketplaceStore }
                nftPreviewsGridStore = { nftPreviewsGridStore }
                nftDetailsStore = { nftDetailsStore }
                collectionViewPageStore = { collectionViewPageStore }
                farmViewPageStore = { farmViewPageStore }
                userProfilePageStore = { userProfilePageStore }
                buyNftModalStore = { buyNftModalStore }
                resellNftModalStore = { resellNftModalStore }>
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
