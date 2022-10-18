import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import AppStore from '../../../../core/presentation/stores/AppStore';
import ExploreMiningFarmsPageStore from '../stores/ExploreMiningFarmsPageStore';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';

import { MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Svg from '../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import MiningFarmPeview from '../components/MiningFarmPreview';
import Select from '../../../../core/presentation/components/Select';

import '../styles/page-explore-farms-component.css';

type Props = {
    appStore?: AppStore
    exploreMiningFarmsPageStore?: ExploreMiningFarmsPageStore;
}

function ExploreFarmsPage({ appStore, exploreMiningFarmsPageStore }: Props) {

    useEffect(() => {
        appStore.useLoading(async () => {
            await exploreMiningFarmsPageStore.init();
        });
    }, []);

    const miningFarmFilterModel = exploreMiningFarmsPageStore.miningFarmFilterModel;

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
                        value = {miningFarmFilterModel.searchString}
                        onChange = { exploreMiningFarmsPageStore.onChangeSearchWord}
                        placeholder = {'Search Collections name'}
                        InputProps={{
                            startAdornment: <InputAdornment position="start" >
                                <Svg svg={SearchIcon} />
                            </InputAdornment>,
                        }}
                    />
                    <div></div>
                </div>
                <div className={'DataGridWrapper'}>
                    <div className={'Grid FilterHeader'}>
                        <Select
                            className={'SortBySelect'}
                            onChange={exploreMiningFarmsPageStore.onChangeSortKey}
                            value={miningFarmFilterModel.sortKey} >
                            <MenuItem value = { MiningFarmFilterModel.SORT_KEY_NAME } > Name </MenuItem>
                            <MenuItem value = { MiningFarmFilterModel.SORT_KEY_POPULAR } > Popular </MenuItem>
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

                    { exploreMiningFarmsPageStore.miningFarmEntities === null && (
                        <LoadingIndicator />
                    ) }

                    { exploreMiningFarmsPageStore.miningFarmEntities !== null && (
                        <GridView
                            gridViewState={exploreMiningFarmsPageStore.gridViewState}
                            defaultContent={<div className={'NoContentFound'}>No Farms found</div>} >
                            { exploreMiningFarmsPageStore.miningFarmEntities.map((miningFarmEntity: MiningFarmEntity) => {
                                return (
                                    <MiningFarmPeview
                                        key={miningFarmEntity.id}
                                        miningFarmEntity={miningFarmEntity} />
                                )
                            }) }
                        </GridView>
                    )}

                </div>
            </div>
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(ExploreFarmsPage));
