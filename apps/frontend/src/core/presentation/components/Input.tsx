import React, { ChangeEvent, useRef, useState } from 'react';
import { TextField, FormControl, TextFieldProps } from '@mui/material';
import S from '../../utilities/Main';
import '../styles/input.css';

export enum InputType {
    INTEGER,
    REAL,
    TEXT,
    PHONE,
}

export enum InputMargin {
    NORMAL,
    DENSE,
}

interface Props extends TextFieldProps {
    className?: string;
    inputType?: InputType;
    decimalLength?: number;
    margin?: InputMargin;
    readOnly?: boolean;
    onChange?: null | ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => boolean | void);
    onFocus?: () => void | boolean;
    onBlur?: () => void | boolean;
    stretch?: boolean;
    gray?: boolean;
}

export default function Input(props: Props) {

    /* listeners */
    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        switch (props.inputType) {
            case InputType.INTEGER:
                if (filterInteger(event.target.value) === false) {
                    return;
                }
                break;
            case InputType.REAL:
                if (filterReal(event.target.value, props.decimalLength) === false) {
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

        if (props.onChange !== null) {
            props.onChange(event.target.value);
        }
    }

    function getMargin() {
        switch (props.margin) {
            case InputMargin.DENSE:
                return 'dense';
            case InputMargin.NORMAL:
            default:
                return 'normal';
        }
    }

    const margin = getMargin();
    const { stretch, className, gray, ...propsMore } = props;
    const cssClassStretch = S.CSS.getClassName(stretch, 'InputStretch');
    const cssClassGray = S.CSS.getClassName(gray, 'InputGray');
    return (
        <div className={`Input ${className} ${cssClassStretch} ${cssClassGray} ${S.CSS.getClassName(props.readOnly, 'ReadOnly')}`}>
            <FormControl variant='standard' margin={margin}>
                <TextField
                    {...propsMore}
                    onChange={props.onChange !== null && props.readOnly !== true ? onChange : undefined}
                    margin={margin}
                    variant='standard'
                />
            </FormControl>
        </div>
    )
}

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
