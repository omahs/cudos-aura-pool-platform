import React, { useEffect } from 'react'
import LoadingIndicator from '../../../core/presentation/components/LoadingIndicator';
import SingleRowTable from '../../../core/presentation/components/SingleRowTable';
import '../styles/grid-view.css';

import GridViewIcon from '@mui/icons-material/GridView';
import GridOnIcon from '@mui/icons-material/GridOn';

import S from '../../../core/utilities/Main';
import Svg from '../../../core/presentation/components/Svg';
import GridViewState, { GRID_SETTING } from '../stores/GridViewState';
import { ALIGN_CENTER } from './TableDesktop';
import { observer } from 'mobx-react';

type Props = {
    gridViewState: GridViewState;
    defaultContent: React.ReactNode;
}

function GridView({ gridViewState, defaultContent, children }: React.PropsWithChildren < Props >) {
    useEffect(() => {
        gridViewState.resetDefaults();
    }, [])

    return (
        <div className={'GridView'}>
            <div className={'GridHeader FlexRow FlexGrow'}>
                <div className={'TotalItems B2 SemiBold'}>{gridViewState.getItemCount()} Items</div>
                <div className={'GridLayoutButtons FlexRow'}>
                    <Svg svg={GridViewIcon}
                        className={`Clickable ${S.CSS.getActiveClassName(gridViewState.checkIsGridSettingSelected(GRID_SETTING.LOOSE))}`}
                        onClick={() => gridViewState.setGridSettingAndPreviewCount(GRID_SETTING.LOOSE)}
                    />
                    <Svg svg={GridOnIcon}
                        className={`Clickable ${S.CSS.getActiveClassName(gridViewState.checkIsGridSettingSelected(GRID_SETTING.DENSE))}`}
                        onClick={() => gridViewState.setGridSettingAndPreviewCount(GRID_SETTING.DENSE)}
                    />
                </div>
            </div>
            { gridViewState.isFetching === true && (<LoadingIndicator margin={'16px'}/>)}
            {children.length === 0
                ? <div className={'DefaultContent FlexRow'}>{defaultContent}</div>
                : <SingleRowTable
                    legend={['']}
                    widths={['100%']}
                    aligns={[ALIGN_CENTER]}
                    tableStore={gridViewState.tableStore}
                    content={<div className={`PreviewsGrid Grid ${gridViewState.getGridSettingClass()}`}>{children}</div>}
                />}

        </div>
    )
}

export default observer(GridView);
