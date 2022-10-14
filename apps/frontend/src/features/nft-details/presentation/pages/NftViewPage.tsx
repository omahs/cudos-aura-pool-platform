import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../core/utilities/Main';

import '../styles/page-nft-view-component.css';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import NftViewHistory from '../components/NftViewHistory';
import SvgCudos from '../../../../public/assets/vectors/cudos-logo.svg';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import NftDetailsStore from '../stores/NftDetailsStore';
import { useNavigate, useParams } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import BuyNftModalStore from '../stores/BuyNftModalStore';
import BuyNftModal from '../components/BuyNftModal';
import ResellNftModalStore from '../stores/ResellNftModalStore';
import ResellNftModal from '../components/ResellNftModal';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';

interface Props {
    walletStore?: WalletStore;
    nftDetailsStore?: NftDetailsStore;
    buyNftModalStore?: BuyNftModalStore;
    resellNftModalStore?: ResellNftModalStore;
}

function NftViewPage({ walletStore, nftDetailsStore, buyNftModalStore, resellNftModalStore }: Props) {

    const { nftId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        nftDetailsStore.innitiate(nftId);
    }, []);

    function onClickCalculateRewards() {
        navigate(AppRoutes.REWARDS_CALCULATOR)
    }

    function onClickResellNft() {
        resellNftModalStore.showSignal(nftEntity, nftDetailsStore.cudosPrice, collection.name);
    }

    const nftEntity = nftDetailsStore.nftProfile;
    const collection = nftDetailsStore.collectionProfile;
    const farm = nftDetailsStore.miningFarm;

    // TODO: get crumbs from router
    const crumbs = [
        { name: 'Marketplace', onClick: () => {} },
        { name: 'NFT Name Details', onClick: () => {} },
    ]

    return (
        <PageLayoutComponent
            className = { 'PageNftView' }
            modals = {
                <>
                    <BuyNftModal resellNft={onClickResellNft}/>
                    <ResellNftModal />
                </>
            } >
            <PageHeader />

            { nftEntity === null && (
                <LoadingIndicator />
            ) }

            { nftEntity !== null && (
                <div className={'PageContent AppContent'} >
                    <Breadcrumbs crumbs={crumbs}/>
                    <div className={'Grid GridColumns2'}>
                        <div className={'LeftLayout FlexColumn'}>
                            <div className={'PaddingColumn FlexColumn'}>
                                <div className={'Picture'}
                                    style={{
                                        backgroundImage: `url("${nftEntity.imageUrl}")`,
                                    }} />
                                <div className={'BorderContainer DataUnderPicture FlexColumn B1 SemiBolc'}>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Listing Status</div>
                                        <div className={'DataValue'}>{nftEntity.listingStatus === S.INT_TRUE ? 'Active' : 'Not Listed'}</div>
                                    </div>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>MBuy now for {nftEntity.price.toFixed(0)} CUDOSining Farm</div>
                                        <div className={'DataValue'}>{farm.name}</div>
                                    </div>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Collection</div>
                                        <div className={'DataValue'}>{collection.name}</div>
                                    </div>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Expiry</div>
                                        <div className={'DataValue'}>{nftEntity.getExpiryDisplay()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'H2 Bold'}>Description</div>
                            <div className={'Description B1'}>{collection.description}</div>
                            <NftViewHistory />
                        </div>
                        <div className={'RightLayout FlexColumn'}>
                            <div className={'CollectionName B2 SemiBolBuy now for {nftEntity.price.toFixed(0)} CUDOSd'}>{collection.name}</div>
                            <div className={'H2 Bold NftName'}>{nftEntity.name}</div>
                            <div className={'FlexRow OwnerRow'}>
                                <div className={'FlexRow OwnerBox'}>
                                    <div className={'OwnerPicture'}></div>
                                    <div className={'OwnerInfo FlexColumn'}>
                                        <div className={'AddressName B1 SemiBold'}>Creator</div>
                                        <div className={'Address'}>{nftEntity.creatorAddress}</div>
                                    </div>
                                </div>
                                <div className={'FlexRow OwnerBox'}>
                                    <div className={'OwnerPicture'}></div>
                                    <div className={'OwnerInfo FlexColumn'}>
                                        <div className={'AddressName B1 SemiBold'}>Current Owner</div>
                                        <div className={'Address'}>{nftEntity.currentOwnerAddress}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'BorderContainer FlexColumn B1 SemiBold'}>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Hashing Power</div>
                                    {/* TODO: hash power denomination */}
                                    <div className={'DataValue'}>{nftEntity.hashPower} EH/s</div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    {/* TODO: real estimations how? */}
                                    <div className={'DataLabel'}>Estimated Profit per Day</div>
                                    <div className={'DataValue FlexRow'}>
                                    0.002 BTC
                                        <div className={'SubPrice'}>${(0.002 * nftDetailsStore.bitcoinPrice).toFixed(2)}</div></div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Estimated Profit per Week</div>
                                    <div className={'DataValue FlexRow'}>
                                    0.014 BTC
                                        <div className={'SubPrice'}>${(0.014 * nftDetailsStore.bitcoinPrice).toFixed(2)}</div></div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Estimated Profit per Month</div>
                                    <div className={'DataValue'}>2K</div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Estimated Profit per Year</div>
                                    <div className={'DataValue'}>735</div>
                                </div>
                            </div>
                            <div className={'FlexRow CalculateRewardsNav'}>
                                <div className={'B3'}>You can calculate your rewards in our dynamic Calculator</div>
                                <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_ROW_RIGHT}>
                                    <Button onClick={onClickCalculateRewards}>Calculate Rewards</Button>
                                </Actions>
                            </div>
                            <div className={'BorderContainer FlexColumn B1 SemiBold'}>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Blockchain</div>
                                    <div className={'DataValue'}>CUDOS</div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Price</div>
                                    <div className={'DataValue NftPrice FlexRow'}>
                                        <Svg svg={SvgCudos}/>
                                        <div className={'H3 Bold'}>{nftEntity.price.toFixed(0)} CUDOS</div>
                                        <div className={'SubPrice B2 SemiBold'}>{nftDetailsStore.getNftPriceText()}</div>
                                    </div>
                                </div>
                                {/* TODO: open buy nft popup */}
                                { walletStore.isKeplrConnected()
                                    ? <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL}>
                                        {nftDetailsStore.isNftListed() === true
                                            ? <Button radius={BUTTON_RADIUS.DEFAULT} onClick={() => buyNftModalStore.showSignal(nftEntity, nftDetailsStore.cudosPrice, nftDetailsStore.collectionProfile.name)}>Buy now for {nftEntity.price.toFixed(0)} CUDOS </Button> : ''}
                                        {nftDetailsStore.isNftListed() === false && nftDetailsStore.isOwner(walletStore.getKeplrAddress())
                                            ? <Button radius={BUTTON_RADIUS.DEFAULT} onClick={onClickResellNft}>Resell NFT</Button> : ''}
                                    </Actions> : ''}
                            </div>
                        </div>
                    </div>
                    <div className={'HorizontalSeparator'}/>
                    <div className={'H2 Bold'}>Collection Items</div>
                    {/* TODO: slider */}
                    <div className={'Slider'}>SLIDER PLACEHOLDER</div>
                </div>
            )}

            <PageFooter />
        </PageLayoutComponent>

    )

}

export default inject((stores) => stores)(observer(NftViewPage));
