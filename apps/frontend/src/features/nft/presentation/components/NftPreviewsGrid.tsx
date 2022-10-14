import { MenuItem } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React from 'react'
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import NftPreview from '../../../nft/presentation/components/NftPreview';
import Select from '../../../../core/presentation/components/Select';
import NftPreviewsGridState from '../../../nft/presentation/stores/NftPreviewsGridState';
import '../styles/nft-preview-grid.css';

import GridView from '../../../../core/presentation/components/GridView';
import NftEntity from '../../../nft/entities/NftEntity';

interface Props {
    nftPreviewsGridState: NftPreviewsGridState;
}

function NftPreviewsGrid({ nftPreviewsGridState }: Props) {
    return (
        <div className={'NftModelsViewerTable'}>
            <div className={'Grid FilterHeader'}>
                <Select
                    className={'SortBySelect'}
                    onChange={nftPreviewsGridState.setSortByIndex}
                    value={nftPreviewsGridState.selectedSortIndex}
                >
                    {NftPreviewsGridState.TABLE_KEYS.map(
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
                gridViewState={nftPreviewsGridState.gridViewState}
                defaultContent={<div className={'NoContentFound'}>No Nfts found</div>}
            >
                {nftPreviewsGridState.nftEntities.map(
                    (nftEntity: NftEntity, index: number) => <NftPreview
                        key={index}
                        nftEntity={nftEntity}
                        collectionEntity={nftPreviewsGridState.getCollectionById(nftEntity.collectionId)}
                    />,
                )}
            </GridView>
        </div>
    )
}

export default inject((stores) => stores)(observer(NftPreviewsGrid));
