// eslint-disable-next-line max-classes-per-file
import React from 'react';

import S from '../../utilities/Main';

import TableDesktop, { TableDesktopProps } from './TableDesktop';
import TableMobile, { TableMobileProps } from './TableMobile';

import '../styles/table.css';

interface Props extends TableDesktopProps, TableMobileProps {
}

export function row(cells: TableCell[], rowClassNameName: string = S.Strings.EMPTY) {
    return new TableRow(cells, rowClassNameName);
}

export function cell(content: any, sortValue: any = null) {

    if (sortValue === null) {
        sortValue = content;
    }

    return new TableCell(content, sortValue);
}

export function cellString(content: string, className = S.Strings.EMPTY) {

    const cellNode = (
        <span className = { `Dots ${className}` } title = { content } > { content } </span>
    );

    return cell(cellNode, content);
}

const Table = (props: Props) => {

    return (
        <>
            <TableDesktop
                className = { props.className }
                widths = { props.widths }
                legend = { props.legend }
                aligns = { props.aligns }
                helper = { props.helper }
                onClickRow = { props.onClickRow }
                onClickLegend = { props.onClickLegend }
                rows = { props.rows }
                columnsOrderMap = { props.columnsOrderMap }
                showPaging = { props.showPaging }
                contentScrollable = { props.contentScrollable }
                onChangeColumnsOrderIndex = { props.onChangeColumnsOrderIndex } />
            <TableMobile
                className = { props.className }
                legend = { props.legend }
                helper = { props.helper }
                onClickRow = { props.onClickRow }
                onClickLegend = { props.onClickLegend }
                rows = { props.rows}
                firstRowActionIndex = { props.firstRowActionIndex }
                lastRowActionIndex = { props.lastRowActionIndex }
                itemsSize = { props.itemsSize }
                showPaging = { props.showPaging } />
        </>
    )

}

export default Table;

interface TableBoolProps {
    className?: string;
    positiveLabel?: string;
    negativeLabel?: string;
    value: S.INT_TRUE | S.INT_FALSE;
}

const TableBool = (props: TableBoolProps) => {

    return (
        <div className = { `TableBool ${props.className} ${S.CSS.getActiveClassName(props.value === S.INT_TRUE)}` } >
            { props.value === S.INT_TRUE ? props.positiveLabel : props.negativeLabel }
        </div>
    )

}

TableBool.defaultProps = {
    className: S.Strings.EMPTY,
    positiveLabel: 'Yes',
    negativeLabel: 'No',
}

export class TableRow {

    cells: TableCell[];
    rowClassName: string;

    constructor(cells: TableCell[], rowClassName: string = S.Strings.EMPTY) {
        this.cells = cells;
        this.rowClassName = rowClassName;
    }
}

export class TableCell {

    content: any;
    sortValue: any;

    constructor(content: any, sortValue: any) {
        this.content = content;
        this.sortValue = sortValue;
    }

}
