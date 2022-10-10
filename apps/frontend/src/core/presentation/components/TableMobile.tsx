import React, { useState } from 'react';

import S from '../../utilities/Main';
import TableStore from '../stores/TableStore';

import { TableRow } from './Table';
import Paging from './TablePaging';
import Popover from './Popover';

import ArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowUpIcon from '@mui/icons-material/ArrowDropUp';
import '../styles/table-mobile.css';
import { observer } from 'mobx-react';

export interface TableMobileProps {
    className?: string;
    legend: any[];
    helper: TableStore;
    rows: TableRow[];
    onClickRow?: (i: number) => void,
    onClickLegend?: (sortKey: number, i: number) => void;
    firstRowActionIndex?: number,
    lastRowActionIndex?: number,
    itemsSize?: number,
    showPaging?: boolean,
}

const TableMobile = (props: TableMobileProps) => {

    const [sortDropDownOpened, setSortDropDownOpened] = useState(false);
    const [sortDropDownAnchor, setSortDropDownAnchor] = useState(null);

    const onToggleSortDropDown = (e) => {
        if (sortDropDownOpened === false) {
            setSortDropDownAnchor(e.target);
        }
        setSortDropDownOpened(!sortDropDownOpened);
        e.stopPropagation();
    }

    const onCloseSortDropDown = (e) => {
        setSortDropDownOpened(false);
        if (e !== undefined) {
            e.stopPropagation();
        }
    }

    const onClickLegendCell = (index: number) => {
        const helper = props.helper;
        if (helper.isTableSortIndexClickable(index) === false) {
            return;
        }

        const sortKey = helper.getTableSortKey(index);
        if (Math.abs(helper.tableState.sortKey) === sortKey) {
            helper.updateTableSortDirection();
        } else {
            helper.updateTableSort(sortKey);
        }

        if (props.onClickLegend !== null) {
            props.onClickLegend(helper.tableState.sortKey, index);
        }
    }

    const onClickRow = (rowIndex: number) => {
        if (props.onClickRow !== null) {
            props.onClickRow(rowIndex);
        }
    }

    const renderLegend = () => {
        const helper = props.helper
        const legend = props.legend;
        const tableSortIndex = helper.getTableSortIndex();
        const sortOptions = [];

        for (let i = 0; i < legend.length; ++i) {
            if (helper.isTableSortIndexClickable(i) === false) {
                continue;
            }

            sortOptions.push((
                <div key = { i } onClick = { onClickLegendCell.bind(this, i) } >
                    { legend[i] }
                </div>
            ));
        }

        return (
            <div className = { 'TableRow Legend' } >
                <div className = { 'TableCell' } >
                    <div> { legend[0] } </div>
                    <div onClick = { onToggleSortDropDown }>
                        { sortOptions.length > 0 && (
                            <>
                                { tableSortIndex === S.NOT_EXISTS && (
                                    'Sort by'
                                ) }
                                { tableSortIndex !== S.NOT_EXISTS && (
                                    <div className = { 'FlexRow' } >
                                        <div>
                                        orted by&nbsp;
                                            { legend[tableSortIndex] }
                                        </div>
                                        { renderSortArrow(tableSortIndex) }
                                    </div>
                                ) }
                                <Popover
                                    open = { sortDropDownOpened }
                                    anchorEl = { sortDropDownAnchor }
                                    onClose = { onCloseSortDropDown }
                                    anchorOrigin = { {
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    } } >

                                    <div className = { 'TableMobileHeaderSortOptions' } >
                                        { sortOptions }
                                    </div>

                                </Popover>
                            </>
                        ) }
                    </div>
                </div>
            </div>
        )
    }

    const renderSortArrow = (index: number) => {
        const helper = props.helper;
        const sortIndex = helper.getTableSortIndex();
        if (sortIndex !== index) {
            return null;
        }

        return helper.tableState.sortKey > 0 ? <ArrowUpIcon/> : <ArrowDownIcon/>;
    }

    const renderRows = () => {
        const rows = props.rows;
        if (rows.length === 0) {
            return (
                <div className = { 'Empty FlexSingleCenter' } > Няма намерени резултати </div>
            );
        }

        const itemsSize = props.itemsSize === S.NOT_EXISTS ? props.legend.length : props.itemsSize;
        const resultRows = [];

        for (let i = 0; i < rows.length; ++i) {
            const cells = rows[i].cells;

            const resultRow = [
                (
                    <div
                        key = { 0 }
                        className = { 'TableCell FlexRow' } >

                        <div> { cells[0].content } </div>
                        { props.firstRowActionIndex !== S.NOT_EXISTS && (
                            <div> { cells[props.firstRowActionIndex].content } </div>
                        )}

                    </div>
                ),
            ]

            for (let j = 1; j < itemsSize; ++j) {
                resultRow.push((
                    <div
                        key = { j }
                        className = { 'TableCell FlexRow' } >

                        <div> { props.legend[j] } </div>
                        <div> { cells[j].content } </div>

                    </div>
                ));
            }

            resultRows.push((
                <div key = { i } className = { `TableRow Transition ${rows[i].rowClassName} ` } onClick = { onClickRow.bind(this, i) } > { resultRow } </div>
            ));
        }

        return resultRows;
    }

    return (
        <div className = { `Table TableMobile ${props.className}` } >
            { renderLegend() }
            { renderRows() }
            { props.showPaging === true && (
                <Paging helper = { props.helper } />
            ) }
        </div>
    )

}

TableMobile.defaultProps = {
    'className': S.Strings.EMPTY,
    'onClickRow': null,
    'firstRowActionIndex': S.NOT_EXISTS,
    'lastRowActionIndex': S.NOT_EXISTS,
    'itemsSize': S.NOT_EXISTS,
    'showPaging': true,
};

export default observer(TableMobile);
