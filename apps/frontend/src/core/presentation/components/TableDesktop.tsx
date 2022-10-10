import React from 'react';
import { observer } from 'mobx-react';

import S from '../../utilities/Main';

import TableStore from '../stores/TableStore';
import Paging from './TablePaging';
import Scrollable from './Scrollable';
import { TableRow } from './Table';

import ArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowUpIcon from '@mui/icons-material/ArrowDropUp';
import '../styles/table-desktop.css';

export interface TableDesktopProps {
    className?: string;
    widths: string[];
    legend: string[];
    aligns?: number[];
    helper: TableStore;
    rows: TableRow[];
    columnsOrderMap?: Map < number, number >;
    onChangeColumnsOrderIndex?: (oldIndex: number, newIndex: number) => void;
    onClickRow?: (i: number) => void;
    onClickLegend?: (sortKey: number, i: number) => void;
    showPaging?: boolean;
    contentScrollable?: boolean;
}

export const ALIGN_LEFT = 1;
export const ALIGN_CENTER = 2;
export const ALIGN_RIGHT = 3;

const TableDesktop = (props: TableDesktopProps) => {

    const getCellStyle = (index: number) => {
        const widths = props.widths;

        return {
            'width': widths[index],
        };
    }

    const getCellAlign = (index: number) => {
        const aligns = props.aligns;
        if (aligns === null) {
            return S.Strings.EMPTY;
        }

        switch (aligns[index]) {
            case ALIGN_CENTER:
                return 'TableCellAlignCenter';
            case ALIGN_RIGHT:
                return 'TableCellAlignRight';
            case ALIGN_LEFT:
            default:
                return 'TableCellAlignLeft';
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

    const onLegendDragStart = (i: number, e) => {
        e.dataTransfer.setData('index', i);
    }

    const onLegendDragEnter = (e) => {
        e.preventDefault();
    }

    const onLegendDragLeave = (e) => {
        hideDropCursor(e);
    }

    const onLegendDragOver = (e) => {
        e.preventDefault();
        showDropCursor(e);
        positionDropCursor(e);
    }

    const onDrop = (i: number, e) => {
        hideDropCursor(e);

        const oldIndex = parseInt(e.dataTransfer.getData('index'));
        if (i === oldIndex) {
            return;
        }

        let newIndex;
        if (i < oldIndex) { // moving to the left
            newIndex = isLeftPartOfTheCell(e) === true ? i : i + 1;
        } else if (i > oldIndex) { // moving to the right
            newIndex = isLeftPartOfTheCell(e) === true ? i - 1 : i;
        }

        if (props.onChangeColumnsOrderIndex !== null) {
            props.onChangeColumnsOrderIndex(oldIndex, newIndex);
        }
    }

    const renderLegend = () => {
        const helper = props.helper
        const legend = props.legend;
        const columnsOrderMap = props.columnsOrderMap;
        const legendRow = [];

        for (let k = 0; k < legend.length; ++k) {
            const draggable = k !== 0 && columnsOrderMap !== null;
            const i = columnsOrderMap === null ? k : columnsOrderMap.get(k);
            legendRow.push((
                <div
                    key = { i }
                    className = { `TableCell FlexRow ${getCellAlign(i)} ${S.CSS.getClassName(helper.isTableSortIndexClickable(i), 'Clickable')} ${S.CSS.getClassName(helper.getTableSortIndex() === i, 'Sorted')}` }
                    style = { getCellStyle(i) }
                    onClick = { onClickLegendCell.bind(this, i) }
                    draggable = { draggable }
                    onDragStart = { draggable === false ? undefined : onLegendDragStart.bind(this, k) }
                    onDragEnter = { draggable === false ? undefined : onLegendDragEnter }
                    onDragLeave = { draggable === false ? undefined : onLegendDragLeave }
                    onDragOver = { draggable === false ? undefined : onLegendDragOver }
                    onDrop = { draggable === false ? undefined : onDrop.bind(this, k) } >

                    { legend[i] }
                    { renderSortArrow(i) }

                </div>
            ))
        }

        return (
            <div className = { 'TableRow Legend' } > { legendRow } </div>
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

        const helper = props.helper;
        const columnsOrderMap = props.columnsOrderMap;
        const tableSortIndex = helper.getTableSortIndex();
        const resultRows = [];

        for (let i = 0; i < rows.length; ++i) {
            const row = rows[i]

            const resultRow = [];

            const cells = row.cells;
            for (let k = 0; k < cells.length; ++k) {
                const j = columnsOrderMap === null ? k : columnsOrderMap.get(k);
                resultRow.push((
                    <div key = { j } className = { `TableCell FlexRow ${getCellAlign(j)} ${S.CSS.getClassName(tableSortIndex === j, 'Sorted')}` } style = { getCellStyle(j) } > { cells[j].content } </div>
                ))
            }
            resultRows.push((
                <div key = { i } className = { `TableRow Transition ${row.rowClassName} ` } onClick = { onClickRow.bind(this, i) } > { resultRow } </div>
            ));
        }

        if (props.contentScrollable === true) {
            return (
                <Scrollable classNameContent = { 'FlexColumn' }>{resultRows}</Scrollable>
            );
        }

        return resultRows;
    }

    return (
        <div className = { `Table TableDesktop ${S.CSS.getClassName(props.contentScrollable, 'ContentScrollable')} ${props.className}` } >
            { renderLegend() }
            { renderRows() }
            { props.showPaging === true && (
                <Paging helper = { props.helper } />
            ) }
        </div>
    )

}

TableDesktop.defaultProps = {
    'className': S.Strings.EMPTY,
    'aligns': null,
    'onClickRow': null,
    'showPaging': true,
    'contentScrollable': false,
    'columnsOrderMap': null,
    'onChangeColumnsOrderIndex': null,
};

export default observer(TableDesktop);

// drop & drop helper functions
function getTableCell(e) {
    let tableCell = e.target;
    while ((tableCell instanceof HTMLElement) === false || S.CSS.hasClass(tableCell, 'TableCell') === false) {
        tableCell = tableCell.parentNode;
        if (tableCell === document.body) {
            return null;
        }
    }

    return tableCell;
}

function isLeftPartOfTheCell(e, tableCell = null) {
    tableCell = tableCell ?? getTableCell(e);
    if (tableCell === null) {
        return false;
    }

    const mouseX = e.screenX;
    const cellLeftX = S.getScreenX(tableCell);
    const cellMiddle = cellLeftX + (tableCell.offsetWidth >> 1);

    return cellLeftX < mouseX && mouseX < cellMiddle;
}

function showDropCursor(e) {
    const tableCell = getTableCell(e);
    if (tableCell === null) {
        return;
    }

    S.CSS.addClass(tableCell, 'DropTarget');
}

function hideDropCursor(e) {
    const tableCell = getTableCell(e);
    if (tableCell === null) {
        return;
    }

    S.CSS.removeClass(tableCell, 'DropTarget');
    S.CSS.removeClass(tableCell, 'DropTargetLeft');
    S.CSS.removeClass(tableCell, 'DropTargetRight');
}

function positionDropCursor(e) {
    const tableCell = getTableCell(e);
    if (tableCell === null) {
        return;
    }

    if (isLeftPartOfTheCell(e, tableCell) === true) {
        S.CSS.addClass(tableCell, 'DropTargetLeft');
        S.CSS.removeClass(tableCell, 'DropTargetRight');
    } else {
        S.CSS.removeClass(tableCell, 'DropTargetLeft');
        S.CSS.addClass(tableCell, 'DropTargetRight');
    }
}
