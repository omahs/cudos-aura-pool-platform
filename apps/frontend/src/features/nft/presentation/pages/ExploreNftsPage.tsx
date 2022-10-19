import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import NftEntity from '../../entities/NftEntity';
import NftFilterModel from '../../utilities/NftFilterModel';
import ExploreNftsPageStore from '../stores/ExploreNftsPageStore';
import AppStore from '../../../../core/presentation/stores/AppStore';

import { InputAdornment, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import Select from '../../../../core/presentation/components/Select';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import NftPreview from '../components/NftPreview';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import CategoriesSelector from '../../../collection/presentation/components/CategoriesSelector';
import ExplorePageLayout from '../../../../core/presentation/components/ExplorePageLayout';
import DataGridLayout from '../../../../core/presentation/components/DataGridLayout';

import '../styles/page-explore-nfts-component.css';

type Props = {
    appStore?: AppStore;
    exploreNftsPageStore?: ExploreNftsPageStore;
}

function ExploreNftsPage({ appStore, exploreNftsPageStore }: Props) {

    useEffect(() => {
        appStore.useLoading(async () => {
            exploreNftsPageStore.init();
        });
    }, [])

    const nftFilterModel = exploreNftsPageStore.nftFilterModel;

    return (
        <PageLayoutComponent className = { 'PageExploreNfts' } >

            <PageHeader />

            <div className={'PageContent AppContent'} >

                <ExplorePageLayout
                    header = { (
                        <>
                            <div className={'H2 Bold'}>Explore NFTs</div>
                            <Input
                                inputType={InputType.TEXT}
                                className={'SearchBar'}
                                value = {nftFilterModel.searchString}
                                onChange = { exploreNftsPageStore.onChangeSearchWord }
                                placeholder = {'Search Collections, Farms and accounts'}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" >
                                        <Svg svg={SearchIcon} />
                                    </InputAdornment>,
                                }} />
                            <CategoriesSelector
                                selectedCategoryIds = { nftFilterModel.categoryIds }
                                onChangeCategories = { exploreNftsPageStore.onChangeCategoryIds } />
                        </>
                    ) }>

                    <DataGridLayout
                        header = { (
                            <>
                                <Select
                                    className={'SortBySelect'}
                                    onChange={exploreNftsPageStore.onChangeSortKey}
                                    value={nftFilterModel.sortKey} >
                                    <MenuItem value = { NftFilterModel.SORT_KEY_NAME } > Name </MenuItem>
                                    <MenuItem value = { NftFilterModel.SORT_KEY_PRICE } > Price </MenuItem>
                                </Select>
                                <Actions
                                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_RIGHT}
                                    height={ACTIONS_HEIGHT.HEIGHT_48} >
                                    {/* TODO: show all filters */}
                                    <Button
                                        padding={BUTTON_PADDING.PADDING_24}
                                        type={BUTTON_TYPE.ROUNDED} >
                            All Filters
                                    </Button>
                                </Actions>
                            </>
                        ) } >

                        { exploreNftsPageStore.nftEntities === null && (
                            <LoadingIndicator />
                        ) }

                        { exploreNftsPageStore.nftEntities !== null && (
                            <GridView
                                gridViewState={exploreNftsPageStore.gridViewState}
                                defaultContent={<div className={'NoContentFound'}>No Nfts found</div>}>
                                {exploreNftsPageStore.nftEntities.map(
                                    (nftEntity: NftEntity, index: number) => {
                                        return (
                                            <NftPreview
                                                key={index}
                                                nftEntity={nftEntity}
                                                collectionName={exploreNftsPageStore.getCollectioName(nftEntity.collectionId)} />
                                        )
                                    },
                                )}
                            </GridView>
                        ) }

                    </DataGridLayout>

                </ExplorePageLayout>

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreNftsPage));
