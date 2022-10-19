import React from 'react';

import TableCell from '../../entities/TableCell';
import TableRow from '../../entities/TableRow';
import Table, { Props as TableProps } from './Table';

import '../styles/single-row-table.css';

type Props = TableProps & {
    content: any
}

export default function SingleRowTable(props: Props) {
    return (
        <Table
            {...props}
            rows={[
                new TableRow([
                    new TableCell(props.content, 0),
                ]),
            ]}
            className={`SingleRowTable ${props.className}`} />
    )
}
