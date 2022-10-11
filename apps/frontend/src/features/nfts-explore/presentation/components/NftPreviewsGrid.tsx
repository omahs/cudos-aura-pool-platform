import { MenuItem } from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react'
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import NftPreview from './NftPreview';
import Select from '../../../../core/presentation/components/Select';
import SingleRowTable from '../../../../core/presentation/components/SingleRowTable';
import TableDesktop, { ALIGN_CENTER } from '../../../../core/presentation/components/TableDesktop';
import NftPreviewModel from '../../entities/NftPreviewModel'
import NftPreviewsGridStore from '../stores/NftPreviewsGridStore';
import '../styles/nft-preview-grid.css';

import GridViewIcon from '@mui/icons-material/GridView';
import GridOnIcon from '@mui/icons-material/GridOn';

import S from '../../../../core/utilities/Main';

interface Props {
    nftPreviewsGridStore?: NftPreviewsGridStore;
}

function NftPreviewsGrid(props: Props) {
    useEffect(() => {
        props.nftPreviewsGridStore.innitialLoad();
    }, [])

    const store = props.nftPreviewsGridStore;

    return (
        <div
            className={'NftModelsViewerTable'}><div className={'GridHeader FlexColumn'}>
                <div className={'Grid FilterHeader'}>
                    <Select
                        className={'SortBySelect'}
                        onChange={store.setSortByIndex}
                        value={store.selectedSortIndex}
                    >
                        {NftPreviewsGridStore.TABLE_KEYS.map(
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
                <div className={'FlexRow FlexGrow'}>
                    <div className={'TotalItems B2 SemiBold'}>{store.getItemCount()} Items</div>
                    <div className={'GridLayoutButtons'}>
                        <GridViewIcon
                            className={`SVG Icon Clickable ${S.CSS.getActiveClassName(store.checkIsGridSettingSelected(NftPreviewsGridStore.GRID_SETTING_LOOSE))}`}
                            onClick={() => store.setGridSettingAndPreviewCount(NftPreviewsGridStore.GRID_SETTING_LOOSE)}
                        />
                        <GridOnIcon
                            className={`SVG Icon Clickable ${S.CSS.getActiveClassName(store.checkIsGridSettingSelected(NftPreviewsGridStore.GRID_SETTING_DENSE))}`}
                            onClick={() => store.setGridSettingAndPreviewCount(NftPreviewsGridStore.GRID_SETTING_DENSE)}
                        />
                    </div>
                </div>
            </div>
            <SingleRowTable
                legend={['']}
                widths={['100%']}
                aligns={[ALIGN_CENTER]}
                tableStore={store.tableHelper}
                content={
                    <>
                        { store.isFetchingNfts === true
                            ? (
                                <LoadingIndicator margin={'16px'}/>
                            ) : (
                                <div className={`NftPreviewsGrid Grid ${store.getGridSettingClass()}`}>
                                    {store.nftPreviews.map(
                                        (nftPreviewModel: NftPreviewModel, index: number) => <NftPreview
                                            key={index}
                                            nftPreviewModel={nftPreviewModel}
                                        />,
                                    )}
                                </div>
                            )
                        }
                    </>
                }
                noRowsContent={<div className={'NoNfts'}>No Nfts found.</div>} />
        </div>
    )
}

export default inject('nftPreviewsGridStore')(observer(NftPreviewsGrid));
