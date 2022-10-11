import React from 'react';
import { inject, observer } from 'mobx-react';

// import PageHeader from '../components-inc/PageHeader';
// import PageFooter from '../components-inc/PageFooter';

import S from '../../../../core/utilities/Main';

import SearchIcon from '@mui/icons-material/Search';

import '../styles/page-explore-nfts-component.css';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import NftPreviewsGrid from '../components/NftPreviewsGrid';
import NftPreviewsGridStore from '../stores/NftPreviewsGridStore';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

interface Props {
    nftPreviewsGridStore?: NftPreviewsGridStore;
}

function ExploreNftsPageComponent({ nftPreviewsGridStore }: Props) {

    return (
        <PageLayoutComponent
            className = { 'PageExploreNfts' }
            modals = { [
            ] } >
            <div className={'PageContent'} >
                {/* <PageHeader /> */}
                <div className={'ExploreNfts FlexColumn'}>
                    <div className={'PageHeading Heading1'}>Explore NFTs</div>
                    <Input
                        inputType={InputType.TEXT}
                        className={'SearchBar'}
                        value = {nftPreviewsGridStore.searchString}
                        onChange = { nftPreviewsGridStore.changeSearchString }
                        placeholder = {'Search Collections, Farms and accounts'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >
                                <SearchIcon />
                            </InputAdornment>,
                        }}
                    />
                    <div className={'CategoriesRow FlexRow'}>
                        {nftPreviewsGridStore.categories.map((category, index) => <div
                            key={index}
                            onClick={() => nftPreviewsGridStore.selectCategory(index)}
                            className={`CategoryName Pointer ${S.CSS.getActiveClassName(nftPreviewsGridStore.selectedCategoryIndex === index)}`}
                        >
                            {category}
                        </div>)
                        }
                    </div>
                </div>
                <NftPreviewsGrid
                />
                {/* <PageFooter /> */}
            </div>
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreNftsPageComponent));
