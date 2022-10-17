import React, { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../core/utilities/Main';

import SearchIcon from '@mui/icons-material/Search';

import '../styles/page-explore-collections-component.css';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import CollectionsPreviewsGridState from '../stores/CollectionPreviewsGridState';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import CollectionEntity from '../../entities/CollectionEntity';
import CollectionRepo from '../repos/CollectionRepo';
import MiningFarmRepo from '../../../mining-farm/presentation/repos/MiningFarmRepo';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import CollectionPreviewsGrid from '../components/CollectionPreviewsGrid';
import CollectionFilterModel from '../../utilities/CollectionFilterModel';
import ExploreCollectionsPageState from '../stores/ExploreCollectionsPageState';
import AppStore from '../../../../core/presentation/stores/AppStore';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import CategoriesStore from '../stores/CategoriesStore';

type Props = {
    repoStore?: RepoStore;
    appStore?: AppStore;
    categoriesStore?: CategoriesStore;
}

function ExploreCollectionsPage({ appStore, repoStore, categoriesStore }: Props) {

    const [state] = useState(new ExploreCollectionsPageState(repoStore.collectionRepo, repoStore.miningFarmRepo));

    useEffect(() => {
        appStore.useLoading(async () => {
            await categoriesStore.init();
            await state.init(categoriesStore.categoryEntities);
        });
    }, [])

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
                            value = {state.searchString()}
                            onChange = { state.setSearchString }
                            placeholder = {'Search Collections name'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >
                                    <Svg svg={SearchIcon} />
                                </InputAdornment>,
                            }}
                        />
                        <div></div>
                    </div>
                    <div className={'CategoriesRow FlexRow'}>
                        {state.categories.map((category, index) => <div
                            key={index}
                            onClick={() => state.toggleCategory(index)}
                            className={`CategoryName Clickable B2 SemiBold ${S.CSS.getActiveClassName(state.isCategorySelected(index))}`}
                        >
                            {category.categoryName}
                        </div>)
                        }
                    </div>
                </div>
                <CollectionPreviewsGrid
                    collectionFilterModel={state.collectionFilterModel}
                    collectionPreviewsGridState = {state.collectionPreviewsGridState} />
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreCollectionsPage));
