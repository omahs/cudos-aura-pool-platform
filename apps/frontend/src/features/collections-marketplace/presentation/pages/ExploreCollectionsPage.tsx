import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import S from '../../../../core/utilities/Main';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import ExploreCollectionsStore from '../stores/ExploreCollectionsStore';

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
import '../styles/page-explore-collections-component.css';

type Props = {
    exploreCollectionsStore?: ExploreCollectionsStore
}

function ExploreCollectionsPage({ exploreCollectionsStore }: Props) {

    const navigate = useNavigate();

    const onClickSeeAllNfts = () => {
        navigate(AppRoutes.EXPLORE_NFTS);
    }

    useEffect(() => {
        async function run() {
            await exploreCollectionsStore.init();
        }
        run();
    }, []);

    return (
        <PageLayoutComponent
            className = { 'PageExploreCollections' } >
            <PageHeader />
            <div className={'PageContent AppContent'} >
                <div className={'ExploreColelctions FlexColumn'}>
                    <div className={'PageHeading H1 Bold'}>Explore NFT Collections</div>
                    <Input
                        inputType={InputType.TEXT}
                        className={'SearchBar'}
                        value = { exploreCollectionsStore.searchString }
                        onChange = { exploreCollectionsStore.changeSearchString }
                        placeholder = {'Search Collections, Farms and accounts'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >
                                <Svg svg={SearchIcon}/>
                            </InputAdornment>,
                        }} />
                    <div className={'CategoriesRow FlexRow'}>
                        { exploreCollectionsStore.categories.map((category, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => exploreCollectionsStore.selectCategory(index)}
                                    className={`CategoryName Transition Clickable ${S.CSS.getActiveClassName(exploreCollectionsStore.selectedCategoryIndex === index)}`} >
                                    {category}
                                </div>
                            )
                        }) }
                    </div>
                </div>
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
                    selectedTopCollectionPeriod={exploreCollectionsStore.selectedTopCollectionPeriod}
                    cudosPriceChangeDisplay={exploreCollectionsStore.cudosPriceChangeDisplay()}
                    cudosPriceUsd={exploreCollectionsStore.cudosPrice}
                    topCollectionPreviews={exploreCollectionsStore.topCollectionPreviews}
                    changeTopCollectionPeriod={exploreCollectionsStore.changeTopCollectionPeriod} />
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}
                    height={ACTIONS_HEIGHT.HEIGHT_48}>
                    {/* TODO: redirect */}
                    <Button
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}>
                        See All Collections
                    </Button>
                </Actions>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(ExploreCollectionsPage));
