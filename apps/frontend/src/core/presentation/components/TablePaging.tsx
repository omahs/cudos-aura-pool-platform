import React from 'react';
import { observer } from 'mobx-react';

import S from '../../utilities/Main';
import TableState from '../stores/TableState';

import SvgArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import SvgArrowRight from '@mui/icons-material/KeyboardArrowRight';

import '../styles/table-paging.css';

type Props = {
    tableState: TableState;
    noVerticalPadding: boolean,
    noHorizontalPadding: boolean,
}

function TablePaging({ tableState, noVerticalPadding, noHorizontalPadding }: Props) {

    function renderPreviousNode() {
        return (
            <div className = { 'SVG Size IconArrow' } ><SvgArrowLeft /></div>
        )
    }

    function renderNextNode() {
        return (
            <div className = { 'SVG Size IconArrow' } ><SvgArrowRight /></div>
        )
    }

    function renderPageNode(key: number, text: string | React.ReactNode | number, active: boolean, page: number) {
        const onClickHandler = page === S.NOT_EXISTS ? undefined : () => {
            tableState.updateTablePage(page * tableState.tableFilterState.itemsPerPage);
        };

        return (
            <div
                key = { key }
                className = { `FlexSingleCenter ${S.CSS.getClassName(onClickHandler !== null, 'Clickable')} ${S.CSS.getActiveClassName(active)}` }
                onClick = { onClickHandler } >

                { text }

            </div>
        );
    }

    const tableFilterState = tableState.tableFilterState;

    const pageOffset = 2;
    const cntPage = Math.floor(tableFilterState.from / tableFilterState.itemsPerPage);
    const totalPages = Math.floor((tableFilterState.total + (tableFilterState.itemsPerPage - 1)) / tableFilterState.itemsPerPage);

    let startPage = cntPage - pageOffset;
    let endPage = cntPage + pageOffset + 1;
    if (startPage < 0) {
        startPage = 0;
    }
    if (endPage > totalPages) {
        endPage = totalPages;
    }

    if (totalPages <= 1) {
        return null;
    }

    const result = [];

    if (cntPage - 1 >= 0) {
        result.push(renderPageNode(-1, renderPreviousNode(), false, cntPage - 1));
    }

    if (cntPage - pageOffset - 1 >= 0) {
        result.push(renderPageNode(0, 1, false, 0));
        if (cntPage - pageOffset - 1 > 0) {
            result.push(renderPageNode(-2, '...', false, S.NOT_EXISTS));
        }
    }

    for (let i = startPage; i < endPage; ++i) {
        if (i === cntPage) {
            result.push(renderPageNode(-3, i + 1, true, S.NOT_EXISTS));
        } else {
            result.push(renderPageNode(i, i + 1, false, i));
        }
    }

    if (cntPage + pageOffset + 1 < totalPages) {
        if (cntPage + pageOffset + 1 < totalPages - 1) {
            result.push(renderPageNode(-4, '...', false, S.NOT_EXISTS));
        }
        result.push(renderPageNode(totalPages - 1, totalPages, false, totalPages - 1));
    }

    if (cntPage + 1 < totalPages) {
        result.push(renderPageNode(-5, renderNextNode(), false, cntPage + 1));
    }

    return (
        <div className = { `TablePaging ${S.CSS.getClassName(noVerticalPadding, 'NoVerticalPadding')} ${S.CSS.getClassName(noHorizontalPadding, 'NoHorizontalPadding')}` } > { result } </div>
    );

}

TablePaging.defaultProps = {
    noVerticalPadding: false,
    noHorizontalPadding: false,
};

export default observer(TablePaging);
