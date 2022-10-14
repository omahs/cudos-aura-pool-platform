import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../core/utilities/Main';

import SearchIcon from '@mui/icons-material/Search';

import '../styles/page-explore-nfts-component.css';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import NftPreviewsGrid from '../components/NftPreviewsGrid';
import NftPreviewsGridStore from '../stores/NftPreviewsGridStore';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';

interface Props {
    nftPreviewsGridStore?: NftPreviewsGridStore;
}

function ExploreNftsPage({ nftPreviewsGridStore }: Props) {

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
                        value = {nftPreviewsGridStore.searchString}
                        onChange = { nftPreviewsGridStore.changeSearchString }
                        placeholder = {'Search Collections, Farms and accounts'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >
                                <Svg svg={SearchIcon} />
                            </InputAdornment>,
                        }}
                    />
                    <div className={'CategoriesRow FlexRow'}>
                        {nftPreviewsGridStore.categories.map((category, index) => <div
                            key={index}
                            onClick={() => nftPreviewsGridStore.selectCategory(index)}
                            className={`CategoryName Clickable B2 SemiBold ${S.CSS.getActiveClassName(nftPreviewsGridStore.selectedCategoryIndex === index)}`}
                        >
                            {category}
                        </div>)
                        }
                    </div>
                </div>
                <NftPreviewsGrid />
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreNftsPage));
