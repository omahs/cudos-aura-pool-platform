import React, { useEffect, useRef } from 'react';
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

type Props = {
    collectionsRepo: CollectionRepo
    miningFarmRepo: MiningFarmRepo;
}

function ExploreNftsPage({ collectionsRepo, miningFarmRepo }: Props) {

    const fetchFunction = async (): Promise < {collectionEntities: CollectionEntity[], total: number, miningFarmEntities: MiningFarmEntity[]}> => {
        // const { collectionEntities, total } = await collectionsRepo.fetchCollectionsByCategoryAndSearchSortedPaginated(
        //     '',
        //     collectionPreviewsGridState.current.searchString,
        //     'All',
        //     collectionPreviewsGridState.current.getSelectedKey(),
        //     collectionPreviewsGridState.current.gridViewState.getFrom(),
        //     collectionPreviewsGridState.current.gridViewState.getItemsPerPage(),
        // );

        const farmIds = collectionEntities.map((collectionEntity: CollectionEntity) => collectionEntity.farmId);

        const miningFarmEntities = await miningFarmRepo.fetchMiningFarmsByIds(farmIds);
        return { collectionEntities, total, miningFarmEntities }
    }

    const collectionPreviewsGridState = useRef(new CollectionsPreviewsGridState(fetchFunction))

    useEffect(() => {
        collectionPreviewsGridState.current.init([]);
    }, [])

    return (
        <PageLayoutComponent
            className = { 'PageExploreCollections' } >
            <PageHeader />
            <div className={'PageContent AppContent'} >
                <div className={'ExploreCollections FlexColumn'}>
                    <div className={'PageHeading H1 Bold'}>Explore Collections</div>
                    <Input
                        inputType={InputType.TEXT}
                        className={'SearchBar'}
                        value = {collectionPreviewsGridState.current.searchString}
                        onChange = { collectionPreviewsGridState.current.changeSearchString }
                        placeholder = {'Search Collections name'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >
                                <Svg svg={SearchIcon} />
                            </InputAdornment>,
                        }}
                    />
                    <div className={'CategoriesRow FlexRow'}>
                        {collectionPreviewsGridState.current.categories.map((category, index) => <div
                            key={index}
                            onClick={() => collectionPreviewsGridState.current.selectCategory(index)}
                            className={`CategoryName Clickable B2 SemiBold ${S.CSS.getActiveClassName(collectionPreviewsGridState.current.selectedCategoryIndex === index)}`}
                        >
                            {category}
                        </div>)
                        }
                    </div>
                </div>
                <CollectionPreviewsGrid collectionPreviewsGridState = {collectionPreviewsGridState.current}/>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreNftsPage));
