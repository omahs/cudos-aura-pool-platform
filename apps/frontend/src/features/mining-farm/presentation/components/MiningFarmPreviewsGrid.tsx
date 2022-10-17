import { MenuItem } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react'
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import Select from '../../../../core/presentation/components/Select';
import '../styles/mining-farm-previews-grid.css';

import GridView from '../../../../core/presentation/components/GridView';
import MiningFarmFilterModel from '../../utilities/MiningFarmFilterModel';
import MiningFarmPreviewsGridState from '../stores/MiningFarmPreviewsGridState';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import MiningFarmPreview from './MiningFarmPreview';

type Props = {
    miningFarmPreviewsGridState: MiningFarmPreviewsGridState;
    miningFarmFilterModel: MiningFarmFilterModel;
}

function MiningFarmPreviewsGrid({ miningFarmPreviewsGridState, miningFarmFilterModel }: Props) {

    function onChangeSortKey(value) {
        miningFarmFilterModel.sortKey = value;
        miningFarmPreviewsGridState.fetchViewingModels();
    }

    return (
        <div className={'NftModelsViewerTable'}>
            <div className={'Grid FilterHeader'}>
                <Select
                    className={'SortBySelect'}
                    onChange={onChangeSortKey}
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
            <GridView
                gridViewState={miningFarmPreviewsGridState.gridViewState}
                defaultContent={<div className={'NoContentFound'}>No Farms found</div>} >
                { miningFarmPreviewsGridState.miningFarmEntities.map((miningFarmEntity: MiningFarmEntity, index: number) => {
                    return (
                        <MiningFarmPreview
                            key={index}
                            miningFarmEntity={miningFarmEntity} />
                    )
                }) }
            </GridView>
        </div>
    )
}

export default observer(MiningFarmPreviewsGrid);
