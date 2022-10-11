/* global TR */

import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

// import PageHeader from '../components-inc/PageHeader';
// import PageFooter from '../components-inc/PageFooter';
import ExploreCollectionsStore from '../stores/ExploreCollectionsStore';

import SearchIcon from '@mui/icons-material/Search';

import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import TopCollections from '../components/TopCollections';

import S from '../../../../core/utilities/Main';
import '../styles/page-explore-collections-component.css';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

interface Props {
    exploreCollectionsStore?: ExploreCollectionsStore
}

function ExploreCollectionsPageComponent({ exploreCollectionsStore }: Props) {

    const navigate = useNavigate();

    const onClickSeeAllNfts = () => {
        navigate(AppRoutes.EXPLORE_NFTS);
    }

    useEffect(
        () => {
            exploreCollectionsStore.innitialLoad();
        },
        [],
    );

    return (
        <PageLayoutComponent
            className = { 'PageExploreCollections' }
            modals = { [
            ] } >
            <div className={'PageContent'} >
                {/* <PageHeader /> */}
                <div className={'ExploreColelctions FlexColumn'}>
                    <div className={'PageHeading H1 Bold'}>Explore NFT Collections</div>
                    <div className={'Grid'}>
                        <div></div>
                        <Input
                            inputType={InputType.TEXT}
                            className={'SearchBar'}
                            value = { exploreCollectionsStore.searchString }
                            onChange = { exploreCollectionsStore.changeSearchString }
                            placeholder = {'Search Collections, Farms and accounts'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >
                                    <SearchIcon/>
                                </InputAdornment>,
                            }}
                        />
                        <div></div>
                    </div>
                    <div className={'CategoriesRow FlexRow'}>
                        {exploreCollectionsStore.categories.map((category, index) => <div
                            key={index}
                            onClick={() => exploreCollectionsStore.selectCategory(index)}
                            className={`CategoryName Clickable ${S.CSS.getActiveClassName(exploreCollectionsStore.selectedCategoryIndex === index)}`}
                        >
                            {category}
                        </div>)
                        }
                    </div>
                </div>
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}
                    height={ACTIONS_HEIGHT.HEIGHT_48}
                >
                    {/* TODO: redirect */}
                    <Button
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}
                        onClick={onClickSeeAllNfts}
                    >
                        See All NFTs
                    </Button>
                </Actions>
                <TopCollections
                    selectedTopCollectionPeriod={exploreCollectionsStore.selectedTopCollectionPeriod}
                    cudosPriceChangeDisplay={exploreCollectionsStore.cudosPriceChangeDisplay()}
                    cudosPriceUsd={exploreCollectionsStore.cudosPrice}
                    topCollectionPreviews={exploreCollectionsStore.topCollectionPreviews}
                    changeTopCollectionPeriod={exploreCollectionsStore.changeTopCollectionPeriod}
                />
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER}
                    height={ACTIONS_HEIGHT.HEIGHT_48}
                >
                    {/* TODO: redirect */}
                    <Button
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}
                    >
                        See All Collections
                    </Button>
                </Actions>
                {/* <PageFooter /> */}
            </div>
        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(ExploreCollectionsPageComponent));
