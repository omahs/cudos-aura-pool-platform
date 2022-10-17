import React, { useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../core/utilities/Main';

import SearchIcon from '@mui/icons-material/Search';

import '../styles/page-explore-nfts-component.css';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import NftPreviewsGrid from '../../../nft/presentation/components/NftPreviewsGrid';
import NftPreviewsGridState from '../stores/NftPreviewsGridState';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import NftEntity from '../../entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import NftRepo from '../repos/NftRepo';
import CollectionRepo from '../../../collection/presentation/repos/CollectionRepo';

type Props = {
    nftRepo?: NftRepo
    collectionRepo?: CollectionRepo;
}

function ExploreNftsPage({ nftRepo, collectionRepo }: Props) {

    const fetchFunction = async (): Promise < {nftEntities: NftEntity[], total: number, collectionEntities: CollectionEntity[]}> => {
        const { nftEntities, total } = await nftRepo.fetchNftsByCollectionIdCategoryAndSearchSortedPaginated(
            '',
            nftPreviewsGridState.current.searchString,
            'All',
            nftPreviewsGridState.current.getSelectedKey(),
            nftPreviewsGridState.current.gridViewState.getFrom(),
            nftPreviewsGridState.current.gridViewState.getItemsPerPage(),
        );

        const collectionIds = nftEntities.map((nftEntity: NftEntity) => nftEntity.collectionId);

        const collectionEntities = await collectionRepo.fetchCollectionsByIds(collectionIds);
        return { nftEntities, total, collectionEntities }
    }

    const nftPreviewsGridState = useRef(new NftPreviewsGridState(fetchFunction))

    useEffect(() => {
        nftPreviewsGridState.current.init([]);
    }, [])

    return (
        <PageLayoutComponent
            className = { 'PageExploreNfts' } >
            <PageHeader />
            <div className={'PageContent AppContent'} >
                <div className={'ExploreNfts FlexColumn'}>
                    <div className={'PageHeading H1 Bold'}>Explore NFTs</div>
                    <Input
                        inputType={InputType.TEXT}
                        className={'SearchBar'}
                        value = {nftPreviewsGridState.current.searchString}
                        onChange = { nftPreviewsGridState.current.changeSearchString }
                        placeholder = {'Search Collections, Farms and accounts'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >
                                <Svg svg={SearchIcon} />
                            </InputAdornment>,
                        }}
                    />
                    <div className={'CategoriesRow FlexRow'}>
                        {nftPreviewsGridState.current.categories.map((category, index) => <div
                            key={index}
                            onClick={() => nftPreviewsGridState.current.selectCategory(index)}
                            className={`CategoryName Clickable B2 SemiBold ${S.CSS.getActiveClassName(nftPreviewsGridState.current.selectedCategoryIndex === index)}`}
                        >
                            {category}
                        </div>)
                        }
                    </div>
                </div>
                <NftPreviewsGrid nftPreviewsGridState = {nftPreviewsGridState.current}/>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreNftsPage));
