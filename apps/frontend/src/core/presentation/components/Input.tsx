import React, { ChangeEvent } from 'react';

import S from '../../utilities/Main';

import { TextField, TextFieldProps } from '@mui/material';
import '../styles/input.css';

export enum InputType {
    INTEGER,
    REAL,
    TEXT,
    PHONE,
}

type Props = TextFieldProps & {
    className?: string;
    inputType?: InputType;
    decimalLength?: number;
    readOnly?: boolean;
    onChange?: null | ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => boolean | void);
    stretch?: boolean;
    gray?: boolean;
    defaultOnChangeParameter?: boolean,
}

const Input = React.forwardRef(({ className, inputType, decimalLength, readOnly, onChange, stretch, gray, defaultOnChangeParameter, ...props }: Props, ref) => {
    /* listeners */
    function onChangeHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        switch (inputType) {
            case InputType.INTEGER:
                if (filterInteger(event.target.value) === false) {
                    return;
                }
                break;
            case InputType.REAL:
                if (filterReal(event.target.value, decimalLength) === false) {
                    return;
                }
                break;
            case InputType.PHONE:
                if (filterPhone(event.target.value) === false) {
                    return;
                }
                break;
            default:
                break;
        }

        if (onChange !== null) {
            onChange(defaultOnChangeParameter === true ? event : event.target.value);
        }
    }

    const cssClassStretch = S.CSS.getClassName(stretch, 'InputStretch');
    const cssClassGray = S.CSS.getClassName(gray, 'InputGray');

    return (
        <div ref = { ref } className={`Input ${className} ${cssClassStretch} ${cssClassGray} ${S.CSS.getClassName(readOnly, 'ReadOnly')}`}>
            <TextField
                {...props}
                hiddenLabel = { false }
                onChange={onChange !== null && readOnly !== true ? onChangeHandler : undefined}
                margin='dense'
                variant='standard' />
        </div>
    )
});

Input.displayName = 'Input';

Input.defaultProps = {
    className: '',
    inputType: InputType.TEXT,
    decimalLength: 4,
    readOnly: false,
    onChange: null,
    stretch: false,
    gray: false,
    defaultOnChangeParameter: false,
}

export default Input;

function filterInteger(value: string) {
    if (value.length === 0) {
        return true;
    }

    for (let c, i = value.length; i-- > 0;) {
        c = value[i];
        if (c === '+' || c === '-') {
            return i === 0;
        }
        if (c >= '0' && c <= '9') {
            continue;
        }

        return false;
    }

    return true;
}

function filterReal(value: string, decimalLength: number) {
    if (value.length === 0) {
        return true;
    }

    let delimiter = false;
    let currentDecimalLength = 0;
    for (let c, i = 0; i < value.length; ++i) {
        c = value[i];
        if (c === '+' || c === '-') {
            if (i === 0) {
                continue;
            }
        }
        if (c >= '0' && c <= '9') {
            if (delimiter === true) {
                ++currentDecimalLength;
                if (decimalLength < currentDecimalLength) {
                    return false;
                }
            }
            continue;
        } if (c === '.') {
            if (delimiter === true) {
                return false;
            }
            delimiter = true;
            continue;
        }

        return false;
    }

    return true;
}

function filterPhone(value: string) {
    if (value.length === 0) {
        return true;
    }

    let plus = false;
    for (let c, i = value.length; i-- > 0;) {
        c = value[i];
        if (c === '+') {
            if (plus === true || i !== 0) {
                return false;
            }
            plus = true;
            continue;
        }
        if (c >= '0' && c <= '9') {
            continue;
        }
        if (c === ' ') {
            continue;
        }

        return false;
    }

    return true;
}
