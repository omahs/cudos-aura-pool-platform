// eslint-disable-next-line max-classes-per-file
import React from 'react';
import TableCell from '../../entities/TableCell';
import TableRow from '../../entities/TableRow';

import '../styles/single-row-table.css';
import Table from './Table';

type Props = {
    content: any
    className: string
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
            className={`SingleRowTable ${props.className}`}
        />
    )
}
