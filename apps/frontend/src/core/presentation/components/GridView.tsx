import React, { useEffect } from 'react'
import LoadingIndicator from '../../../core/presentation/components/LoadingIndicator';
import SingleRowTable from '../../../core/presentation/components/SingleRowTable';
import '../styles/grid-view.css';

import GridViewIcon from '@mui/icons-material/GridView';
import GridOnIcon from '@mui/icons-material/GridOn';

import S from '../../../core/utilities/Main';
import Svg from '../../../core/presentation/components/Svg';
import GridViewStore, { GRID_SETTING } from '../stores/GridViewStore';
import { ALIGN_CENTER } from './TableDesktop';
import { observer } from 'mobx-react';

interface Props {
    gridViewStore: GridViewStore;
    defaultContent: React.ReactNode;
}

function GridView({ gridViewStore, defaultContent, children }: React.PropsWithChildren < Props >) {
    useEffect(() => {
        gridViewStore.resetDefaults();
    }, [])

    return (
        <div className={'GridView'}>
            <div className={'GridHeader FlexRow FlexGrow'}>
                <div className={'TotalItems B2 SemiBold'}>{gridViewStore.getItemCount()} Items</div>
                <div className={'GridLayoutButtons FlexRow'}>
                    <Svg svg={GridViewIcon}
                        className={`Clickable ${S.CSS.getActiveClassName(gridViewStore.checkIsGridSettingSelected(GRID_SETTING.LOOSE))}`}
                        onClick={() => gridViewStore.setGridSettingAndPreviewCount(GRID_SETTING.LOOSE)}
                    />
                    <Svg svg={GridOnIcon}
                        className={`Clickable ${S.CSS.getActiveClassName(gridViewStore.checkIsGridSettingSelected(GRID_SETTING.DENSE))}`}
                        onClick={() => gridViewStore.setGridSettingAndPreviewCount(GRID_SETTING.DENSE)}
                    />
                </div>
            </div>
            { gridViewStore.isFetching === true
                ? <LoadingIndicator margin={'16px'}/>
                : <SingleRowTable
                    legend={['']}
                    widths={['100%']}
                    aligns={[ALIGN_CENTER]}
                    tableStore={gridViewStore.tableStore}
                    content={<div className={`PreviewsGrid Grid ${gridViewStore.getGridSettingClass()}`}>{children}</div>}
                    noRowsContent={defaultContent}
                /> }
        </div>
    )
}

export default observer(GridView);
