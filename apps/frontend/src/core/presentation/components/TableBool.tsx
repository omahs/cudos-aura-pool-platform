import React from 'react';

import S from '../../utilities/Main';

import '../styles/table-bool.css';

enum TableBoolValue {
    TRUE = S.INT_TRUE,
    FALSE = S.INT_FALSE,
}

type TableBoolProps = {
    className?: string;
    positiveLabel?: string;
    negativeLabel?: string;
    value: TableBoolValue;
}

function TableBool({ className, positiveLabel, negativeLabel, value }: TableBoolProps) {

    return (
        <div className = { `TableBool ${className} ${S.CSS.getActiveClassName(value === TableBoolValue.TRUE)}` } >
            { value === TableBoolValue.TRUE ? positiveLabel : negativeLabel }
        </div>
    )

}

TableBool.defaultProps = {
    className: S.Strings.EMPTY,
    positiveLabel: 'Yes',
    negativeLabel: 'No',
}
