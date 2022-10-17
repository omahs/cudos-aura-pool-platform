import React, { useEffect, useState } from 'react';

import '../styles/page-explore-farms-component.css';
import AppStore from '../../../../core/presentation/stores/AppStore';
import { useNavigate } from 'react-router-dom';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import Input, { InputType } from 'apps/frontend/src/core/presentation/components/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Svg from 'apps/frontend/src/core/presentation/components/Svg';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    appStore?: AppStore
}

function ExploreFarmsPage({ appStore }: Props) {

    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        appStore.useLoading(async () => {
            await exploreFarmsPageStore.init();
        });
    }, []);

    return (
        <PageLayoutComponent
            className = { 'PageExploreFarms' } >
            <PageHeader />
            <div className={'PageContent AppContent FlexColumn'} >
                <div className={'H2 Bold'}>Explore Farms</div>
                <Input
                    inputType={InputType.TEXT}
                    className={'SearchBar'}
                    value = {searchString}
                    onChange = { setSearchString }
                    placeholder = {'Search Collections name'}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" >
                            <Svg svg={SearchIcon} />
                        </InputAdornment>,
                    }}
                />
                <FarmPreviewsGrid farmPreviewGridState={farmViewPageStore.collectionPreviewsGridState}/>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreFarmsPage));
