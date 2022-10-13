import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

// import PageHeader from '../components-inc/PageHeader';
// import PageFooter from '../components-inc/PageFooter';
import S from '../../../../core/utilities/Main';

import '../styles/page-nft-view-component.css';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import NftViewHistory from '../components/NftViewHistory';
import SvgCudos from '../../../../public/assets/vectors/cudos-logo.svg';
import Button from '../../../../core/presentation/components/Button';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import NftDetailsStore from '../stores/NftDetailsStore';
import { useNavigate, useParams } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import Svg from '../../../../core/presentation/components/Svg';

interface Props {
    nftDetailsStore?: NftDetailsStore
}

function NftViewPageComponent({ nftDetailsStore }: Props) {

    const { nftId } = useParams();

    useEffect(
        () => {
            nftDetailsStore.innitiate(nftId);
        },
        [],
    );

    const navigate = useNavigate();
    const onClickCalculateRewards = () => {
        navigate(AppRoutes.REWARDS_CALCULATOR)
    }

    const nft = nftDetailsStore.nftProfile;
    const collection = nftDetailsStore.collectionProfile;
    const farm = nftDetailsStore.miningFarm;

    // TODO: get crumbs from router
    const crumbs = [
        { name: 'Marketplace', onClick: () => {} },
        { name: 'NFT Name Details', onClick: () => {} },
    ]

    return (
        nft === null ? ''
            : <PageLayoutComponent
                className = { 'PageNftView' }
                modals = { [
                ] } >
                <div className={'PageContent'} >
                    {/* <PageHeader /> */}
                    <Breadcrumbs crumbs={crumbs} onClickback={() => {}}/>
                    <div className={'Grid GridColumns2'}>
                        <div className={'LeftLayout FlexColumn'}>
                            <div className={'PaddingColumn FlexColumn'}>
                                <div className={'Picture'}
                                    style={{
                                        backgroundImage: `url("${nft.imageUrl}")`,
                                    }} />
                                <div className={'BorderContainer DataUnderPicture FlexColumn B1 SemiBolc'}>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Listing Status</div>
                                        <div className={'DataValue'}>{nft.listingStatus === S.INT_TRUE ? 'Active' : 'Not Listed'}</div>
                                    </div>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Mining Farm</div>
                                        <div className={'DataValue'}>{farm.name}</div>
                                    </div>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Collection</div>
                                        <div className={'DataValue'}>{collection.name}</div>
                                    </div>
                                    <div className={'DataRow FlexRow'}>
                                        <div className={'DataLabel'}>Expiry</div>
                                        <div className={'DataValue'}>{nft.getExpiryDisplay()}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'H2 Bold'}>Description</div>
                            <div className={'Description B1'}>{collection.description}</div>
                            <NftViewHistory />
                        </div>
                        <div className={'RightLayout FlexColumn'}>
                            <div className={'CollectionName B2 SemiBold'}>{collection.name}</div>
                            <div className={'H2 Bold NftName'}>{nft.name}</div>
                            <div className={'FlexRow OwnerRow'}>
                                <div className={'FlexRow OwnerBox'}>
                                    <div className={'OwnerPicture'}></div>
                                    <div className={'OwnerInfo FlexColumn'}>
                                        <div className={'AddressName B1 SemiBold'}>Creator</div>
                                        <div className={'Address'}>{nft.creatorAddress}</div>
                                    </div>
                                </div>
                                <div className={'FlexRow OwnerBox'}>
                                    <div className={'OwnerPicture'}></div>
                                    <div className={'OwnerInfo FlexColumn'}>
                                        <div className={'AddressName B1 SemiBold'}>Current Owner</div>
                                        <div className={'Address'}>{nft.currentOwnerAddress}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={'BorderContainer FlexColumn B1 SemiBold'}>
                                <div className={'DataRow FlexRow'}>
                                    <div className={'DataLabel'}>Hashing Power</div>
                                    {/* TODO: hash power denomination */}
                                    <div className={'DataValue'}>{nft.hashPower} EH/s</div>
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
                                        <div className={'H3 Bold'}>{nft.price.toFixed(0)} CUDOS</div>
                                        <div className={'SubPrice B2 SemiBold'}>${nft.price.multipliedBy(nftDetailsStore.cudosPrice).toFixed(2)}</div>
                                    </div>
                                </div>
                                {/* TODO: open buy nft popup */}
                                <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL}>
                                    <Button>Buy now for {nft.price.toFixed(0)} CUDOS </Button>
                                </Actions>
                            </div>
                        </div>
                    </div>
                    <div className={'HorizontalSeparator'}/>
                    <div className={'H2 Bold'}>Collection Items</div>
                    {/* TODO: slider */}
                    <div className={'Slider'}>SLIDER PLACEHOLDER</div>
                    {/* <PageFooter /> */}
                </div>
            </PageLayoutComponent>

    )

}

export default inject((stores) => stores)(observer(NftViewPageComponent));
