import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import S from '../../../../core/utilities/Main';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import MarketplaceStore from '../stores/MarketplaceStore';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import TopCollections from '../components/TopCollections';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';

import Svg from '../../../../core/presentation/components/Svg';
import '../styles/marketplace-page.css';
import Slider from '../../../../core/presentation/components/Slider';
import NftEntity from '../../../nft/entities/NftEntity';
import NftPreviewInPicture from '../../../nft/presentation/components/NftPreviewInPicture';
import NftPreview from '../../../nft/presentation/components/NftPreview';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import MiningFarmPreview from '../../../mining-farm/presentation/components/MiningFarmPreview';

type Props = {
    marketplaceStore?: MarketplaceStore
}

function MarkedplacePage({ marketplaceStore }: Props) {

    const navigate = useNavigate();

    function onClickSeeAllNfts() {
        navigate(AppRoutes.EXPLORE_NFTS);
    }

    function onClickSeeAllCollections() {
        navigate(AppRoutes.EXPLORE_COLLECTIONS);
    }

    function onClickSeeAllFarms() {
        navigate(AppRoutes.EXPLORE_FARMS);
    }

    useEffect(() => {
        async function run() {
            await marketplaceStore.init();
        }
        run();
    }, []);

    return (
        <PageLayoutComponent className = { 'PageMarketplace' } >
            <PageHeader />
            <div className={'PageContent AppContent'} >
                <div className={'ExploreCollections FlexColumn'}>
                    <div className={'PageHeading H1 Bold'}>Explore NFT Collections</div>
                    <div className={'Grid GridColumns3'}>
                        <div></div>
                        <Input
                            inputType={InputType.TEXT}
                            className={'SearchBar'}
                            value = { marketplaceStore.searchString }
                            onChange = { marketplaceStore.changeSearchString }
                            placeholder = {'Search Collections, Farms and accounts'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >
                                    <Svg svg={SearchIcon}/>
                                </InputAdornment>,
                            }} />
                        <div></div>
                    </div>
                    <div className={'CategoriesRow FlexRow'}>
                        { marketplaceStore.categories.map((category, index) => {
                            return (
                                <div
                                    key={category.categoryId}
                                    onClick={() => marketplaceStore.selectCategory(index)}
                                    className={`CategoryName Transition Clickable ${S.CSS.getActiveClassName(marketplaceStore.selectedCategoryIndex === index)}`} >
                                    {category.categoryName}
                                </div>
                            )
                        }) }
                    </div>
                </div>
                <div className={'H2 Bold'}>New Hash Rate NFT Drops</div>
                <Slider className={'NewNftDrops'}>
                    {marketplaceStore.newNftDropsEntities.slice(0, 4).map((nftEntity: NftEntity, index: number) => <NftPreviewInPicture
                        key={index}
                        nftEntity={nftEntity}
                        onClick={() => navigate(`${AppRoutes.NFT_VIEW}/${nftEntity.id}`)}
                        collectionEntity={marketplaceStore.getCollectionById(nftEntity.collectionId)}
                    />)}
                </Slider>
                <div className={'H2 Bold'}>Trending NFTs</div>
                <Slider className={'TrendingNfts'}>
                    {marketplaceStore.trendingNftEntities.slice(0, 4).map((nftEntity: NftEntity, index: number) => <NftPreview
                        key={index}
                        nftEntity={nftEntity}
                        onClick={() => navigate(`${AppRoutes.NFT_VIEW}/${nftEntity.id}`)}
                        collectionEntity={marketplaceStore.getCollectionById(nftEntity.collectionId)}
                    />)}
                </Slider>
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}
                    height={ACTIONS_HEIGHT.HEIGHT_48} >
                    {/* TODO: redirect */}
                    <Button
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}
                        onClick={onClickSeeAllNfts} >
                        See All NFTs
                    </Button>
                </Actions>
                <TopCollections
                    selectedTopCollectionPeriod={marketplaceStore.selectedTopCollectionPeriod}
                    cudosPriceChangeDisplay={marketplaceStore.cudosPriceChangeDisplay()}
                    cudosPriceUsd={marketplaceStore.cudosPrice}
                    topCollectionEntities={marketplaceStore.topCollectionEntities}
                    changeTopCollectionPeriod={marketplaceStore.changeTopCollectionPeriod} />
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}
                    height={ACTIONS_HEIGHT.HEIGHT_48}>
                    <Button
                        onClick={onClickSeeAllCollections}
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}>
                        See All Collections
                    </Button>
                </Actions>

                <div className={'PopularFarms FlexColumn'}>
                    <div className={'H2 Bold'}>Popular Farms</div>
                    <div className={'FlexRow FarmPreviews'}>
                        {marketplaceStore.popularFarmsEntities.map((miningFarmEntity: MiningFarmEntity, index: number) => <MiningFarmPreview
                            key={index}
                            miningFarmEntity={miningFarmEntity}
                        />)}
                    </div>
                    <Actions
                        layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}
                        height={ACTIONS_HEIGHT.HEIGHT_48}>
                        <Button
                            onClick={onClickSeeAllFarms}
                            padding={BUTTON_PADDING.PADDING_24}
                            type={BUTTON_TYPE.ROUNDED}>
                        See All Farms
                        </Button>
                    </Actions>
                </div>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(MarkedplacePage));
