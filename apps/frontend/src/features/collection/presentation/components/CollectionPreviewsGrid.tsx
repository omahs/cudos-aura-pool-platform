import { MenuItem } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React from 'react'
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import Select from '../../../../core/presentation/components/Select';
import CollectionPreviewsGridState from '../../../collection/presentation/stores/CollectionPreviewsGridState';
import '../styles/collection-previews-grid.css';

import GridView from '../../../../core/presentation/components/GridView';
import CollectionPreview from './CollectionPreview';
import CollectionEntity from '../../entities/CollectionEntity';

interface Props {
    collectionPreviewsGridState: CollectionPreviewsGridState;
}

function CollectionPreviewsGrid({ collectionPreviewsGridState }: Props) {
    return (
        <div className={'NftModelsViewerTable'}>
            <div className={'Grid FilterHeader'}>
                <Select
                    className={'SortBySelect'}
                    onChange={collectionPreviewsGridState.setSortByIndex}
                    value={collectionPreviewsGridState.selectedSortIndex}
                >
                    {CollectionPreviewsGridState.TABLE_KEYS.map(
                        (key: string, index: number) => <MenuItem key={index} value={index}>{key}</MenuItem>,
                    )}
                </Select>
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_RIGHT}
                    height={ACTIONS_HEIGHT.HEIGHT_48}
                >
                    {/* TODO: show all filters */}
                    <Button
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}
                    >
                        All Filters
                    </Button>
                </Actions>
            </div>
            <GridView
                gridViewState={collectionPreviewsGridState.gridViewState}
                defaultContent={<div className={'NoContentFound'}>No Nfts found</div>}
            >
                {collectionPreviewsGridState.collectionEntities.map(
                    (collectionEntity: CollectionEntity, index: number) => <CollectionPreview
                        key={index}
                        collectionEntity={collectionEntity}
                    />,
                )}
            </GridView>
        </div>
    )
}

export default inject((stores) => stores)(observer(CollectionPreviewsGrid));
