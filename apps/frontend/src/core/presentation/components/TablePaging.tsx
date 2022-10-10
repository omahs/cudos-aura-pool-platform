import React from 'react';

import S from '../../utilities/Main';
import TableStore from '../stores/TableStore';

import SvgArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import SvgArrowRight from '@mui/icons-material/KeyboardArrowRight';

import '../styles/table-paging.css';

interface Props {
    helper: TableStore;
    noVerticalPadding: boolean,
    noHorizontalPadding: boolean,
}

const TablePaging = (props: Props) => {

    const renderPreviousNode = () => {
        return (
            <div className = { 'SVG Size IconArrow' } ><SvgArrowLeft /></div>
        )
    }

    const renderNextNode = () => {
        return (
            <div className = { 'SVG Size IconArrow' } ><SvgArrowRight /></div>
        )
    }

    const renderPageNode = (key: number, text: string | React.ReactNode | number, active: boolean, page: number) => {
        const onClickHandler = page === S.NOT_EXISTS ? undefined : () => {
            const helper = props.helper;
            helper.updateTablePage(page * props.helper.tableState.itemsPerPage);
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

    const helper = props.helper;
    const tableState = helper.tableState;

    const pageOffset = 2;
    const cntPage = Math.floor(tableState.from / tableState.itemsPerPage);
    const totalPages = Math.floor((tableState.total + (tableState.itemsPerPage - 1)) / tableState.itemsPerPage);

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
        <div className = { `TablePaging ${S.CSS.getClassName(props.noVerticalPadding, 'NoVerticalPadding')} ${S.CSS.getClassName(props.noHorizontalPadding, 'NoHorizontalPadding')}` } > { result } </div>
    );

}

TablePaging.defaultProps = {
    noVerticalPadding: false,
    noHorizontalPadding: false,
};

export default TablePaging;
