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
import NftStorageRepo from './features/nft/data/repo/NftStorageRepo';
import ExampleModalStore from './features/ui-kit/presensation/stores/ExampleModalStore';
import CudosStorageRepo from './features/cudos-data/data/repo/CudosStorageRepo';
import NftDetailsStore from './features/nft/presentation/stores/NftDetailsStore';
import CollectionViewPageStore from './features/collection/presentation/stores/CollectionViewPageStore';
import FarmViewPageStore from './features/mining-farm/presentation/stores/FarmViewPageStore';
import WalletStore from './features/ledger/presentation/stores/WalletStore';
import BuyNftModalStore from './features/nft/presentation/stores/BuyNftModalStore';
import ResellNftModalStore from './features/nft/presentation/stores/ResellNftModalStore';
import StorageHelper from './core/helpers/StorageHelper';
import BitcoinStore from './features/bitcoin-data/presentation/stores/BitcoinStore';
import CudosStore from './features/cudos-data/presentation/stores/CudosStore';
import UserProfilePageStore from './features/accounts/presentation/stores/UserProfilePageStore';
import AccountStorageRepo from './features/accounts/data/repo/AccountStorageRepo';
import AccountSessionStore from './features/accounts/presentation/stores/AccountSessionStore';
import RepoStore from './core/presentation/stores/RepoStore';
import CategoriesStore from './features/collection/presentation/stores/CategoriesStore';

const storageHelper = new StorageHelper();

const appStore = new AppStore();
const alertStore = new AlertStore();
const exampleModalStore = new ExampleModalStore();

const bitcoinRepo = new BitcoinStorageRepo(storageHelper);
const cudosRepo = new CudosStorageRepo(storageHelper);
const miningFarmRepo = new MiningFarmStorageRepo(storageHelper);
const collectionRepo = new CollectionStorageRepo(storageHelper);
const nftRepo = new NftStorageRepo(storageHelper);
const accountRepo = new AccountStorageRepo(storageHelper);

const repoStore = new RepoStore(bitcoinRepo, cudosRepo, miningFarmRepo, collectionRepo, nftRepo, accountRepo);

const walletStore = new WalletStore();
const accountSessionStore = new AccountSessionStore(accountRepo);
const bitcoinStore = new BitcoinStore(bitcoinRepo);
const cudosStore = new CudosStore(cudosRepo);
const categoriesStore = new CategoriesStore(collectionRepo);
const rewardsCalculatorStore = new RewardsCalculatorStore(bitcoinStore, miningFarmRepo);
const marketplaceStore = new MarketplaceStore(cudosStore, collectionRepo, nftRepo, miningFarmRepo);
const nftDetailsStore = new NftDetailsStore(bitcoinStore, cudosStore, nftRepo);
const collectionViewPageStore = new CollectionViewPageStore(nftRepo, collectionRepo, miningFarmRepo);
const farmViewPageStore = new FarmViewPageStore(miningFarmRepo, collectionRepo);
const userProfilePageStore = new UserProfilePageStore(bitcoinStore, walletStore, nftRepo, collectionRepo);
const buyNftModalStore = new BuyNftModalStore();
const resellNftModalStore = new ResellNftModalStore();

const App = () => {

    useEffect(() => {
        initHover();
        initOnBeforeUnload();
        removeInitalPageLoading();

        async function run() {
            await walletStore.tryConnect();
            await accountSessionStore.loadSessionAccounts();
        }
        run();
    }, []);

    return (
        <StrictMode>
            <Provider
                repoStore = { repoStore }
                appStore = { appStore }
                alertStore = { alertStore }
                walletStore = { walletStore }
                bitcoinStore = { bitcoinStore }
                cudosStore = { cudosStore }
                categoriesStore = { categoriesStore }
                accountSessionStore = { accountSessionStore }
                exampleModalStore = { exampleModalStore }
                rewardsCalculatorStore = { rewardsCalculatorStore }
                marketplaceStore = { marketplaceStore }
                nftDetailsStore = { nftDetailsStore }
                collectionViewPageStore = { collectionViewPageStore }
                farmViewPageStore = { farmViewPageStore }
                userProfilePageStore = { userProfilePageStore }
                buyNftModalStore = { buyNftModalStore }
                resellNftModalStore = { resellNftModalStore }
                nftRepo = { nftRepo }
                collectionRepo = { collectionRepo } >
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
