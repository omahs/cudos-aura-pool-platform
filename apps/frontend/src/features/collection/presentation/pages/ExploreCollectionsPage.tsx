import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import CollectionEntity from '../../entities/CollectionEntity';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';
import AppStore from '../../../../core/presentation/stores/AppStore';
import ExploreCollectionsPageStore from '../stores/ExploreCollectionsPageStore';

import { InputAdornment, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import Select from '../../../../core/presentation/components/Select';
import GridView from '../../../../core/presentation/components/GridView';
import CollectionPreview from '../components/CollectionPreview';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import CategoriesSelector from '../components/CategoriesSelector';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';

import '../styles/page-explore-collections-component.css';

type Props = {
    appStore?: AppStore;
    exploreCollectionsPageStore?: ExploreCollectionsPageStore;
}

function ExploreCollectionsPage({ appStore, exploreCollectionsPageStore }: Props) {

    useEffect(() => {
        appStore.useLoading(async () => {
            await exploreCollectionsPageStore.init();
        });
    }, [])

    const collectionFilterModel = exploreCollectionsPageStore.collectionFilterModel;

    return (
        <PageLayoutComponent
            className = { 'PageExploreCollections' } >
            <PageHeader />
            <div className={'PageContent AppContent'} >
                <div className={'ExploreCollections FlexColumn'}>
                    <div className={'PageHeading H1 Bold'}>Explore Collections</div>
                    <div className={'Grid GridColumns3'}>
                        <div></div>
                        <Input
                            inputType={InputType.TEXT}
                            className={'SearchBar'}
                            value = {collectionFilterModel.searchString}
                            onChange = { exploreCollectionsPageStore.onChangeSearchWord }
                            placeholder = {'Search Collections name'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >
                                    <Svg svg={SearchIcon} />
                                </InputAdornment>,
                            }}
                        />
                        <div></div>
                    </div>
                    <CategoriesSelector
                        selectedCategoryIds = { collectionFilterModel.categoryIds }
                        onChangeCategories = { exploreCollectionsPageStore.onChangeCategoryIds } />
                </div>
                <div className={'DataGridWrapper'}>
                    <div className={'Grid FilterHeader'}>
                        <Select
                            className={'SortBySelect'}
                            onChange={exploreCollectionsPageStore.onChangeSortKey}
                            value={collectionFilterModel.sortKey} >
                            <MenuItem value = { CollectionFilterModel.SORT_KEY_NAME } > Name </MenuItem>
                            <MenuItem value = { CollectionFilterModel.SORT_KEY_PRICE } > Price </MenuItem>
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
                    </div>

                    { exploreCollectionsPageStore.collectionEntities === null && (
                        <LoadingIndicator />
                    ) }

                    { exploreCollectionsPageStore.collectionEntities !== null && (
                        <GridView
                            gridViewState={exploreCollectionsPageStore.gridViewState}
                            defaultContent={<div className={'NoContentFound'}>No Nfts found</div>} >
                            { exploreCollectionsPageStore.collectionEntities.map((collectionEntity: CollectionEntity) => {
                                return (
                                    <CollectionPreview
                                        key={collectionEntity.id}
                                        collectionEntity={collectionEntity}
                                        miningFarmName={exploreCollectionsPageStore.getMiningFarmName(collectionEntity.farmId)} />
                                )
                            }) }
                        </GridView>
                    ) }
                </div>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreCollectionsPage));
