import React, { useEffect, useState } from 'react';

import '../styles/page-explore-farms-component.css';
import AppStore from '../../../../core/presentation/stores/AppStore';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Svg from '../../../../core/presentation/components/Svg';
import SearchIcon from '@mui/icons-material/Search';
import ExploreMiningFarmsPageState from '../stores/ExploreMiningFarmsPageState';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import MiningFarmPreviewsGrid from '../components/MiningFarmPreviewsGrid';

interface Props {
    appStore?: AppStore
    repoStore?: RepoStore
}

function ExploreFarmsPage({ appStore, repoStore }: Props) {

    const [state] = useState(new ExploreMiningFarmsPageState(repoStore.miningFarmRepo));

    useEffect(() => {
        appStore.useLoading(async () => {
            await state.init();
        });
    }, []);

    return (
        <PageLayoutComponent
            className = { 'PageExploreFarms' } >
            <PageHeader />
            <div className={'PageContent AppContent FlexColumn'} >
                <div className={'H2 Bold'}>Explore Farms</div>
                <div className={'Grid GridColumns3'}>
                    <div></div>
                    <Input
                        inputType={InputType.TEXT}
                        className={'SearchBar'}
                        value = {state.getSearchString()}
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
                <MiningFarmPreviewsGrid miningFarmPreviewsGridState={state.miningFarmPreviewsGridState} miningFarmFilterModel={state.miningFarmFilterModel} />
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreFarmsPage));
