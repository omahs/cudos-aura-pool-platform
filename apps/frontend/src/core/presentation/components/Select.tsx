import React, { useState, useEffect } from 'react';
import { Select as MuiSelect, SelectProps, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import SvgArrowDown from '@mui/icons-material/ArrowDownward';
import '../styles/select.css';

export enum SelectMargin {
    NORMAL = 'normal',
    DENSE = 'dense',
}

type Props = SelectProps & {
    className?: string;
    margin?: SelectMargin;
    onChange?: (value: any) => (boolean | void);
    label?: string;
    readOnly?: boolean;
}

export default function Select({ className, margin, onChange, label, readOnly, ...props }: Props) {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.addEventListener('wheel', onPreventableScroll, { passive: false });
        document.addEventListener('touchmove', onPreventableScroll, { passive: false });
        document.addEventListener('scroll', onUnpreventableScroll);

        return () => {
            document.removeEventListener('wheel', onPreventableScroll);
            document.removeEventListener('touchmove', onPreventableScroll);
            document.removeEventListener('scroll', onUnpreventableScroll);
        }
    });

    function onChangeHandler(e: SelectChangeEvent<unknown>) {
        if (onChange !== undefined) {
            onChange(e.target.value);
        }
    }

    function onPreventableScroll(e) {
        if (open === true) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    function onUnpreventableScroll() {
        if (open === true) {
            onClose();
        }
    }

    function onOpen() {
        setOpen(true);
    }

    function onClose() {
        setOpen(false);
        setTimeout(() => {
            document.activeElement.blur();
        }, 0);
    }

    return (
        <div className = { `Select ${className}` }>
            <FormControl variant = 'outlined' margin = { margin }>

                <InputLabel
                    error = { props.error }
                    variant = { 'outlined' }
                    margin = { margin } >
                    { label }
                </InputLabel>
                <MuiSelect
                    { ...props }
                    onChange = { onChange !== null && readOnly !== true ? onChangeHandler : undefined }
                    onOpen = { onOpen }
                    onClose = { onClose }
                    open = { open }
                    IconComponent = { SvgArrowDown }
                    margin = { margin }
                    MenuProps = {{
                        disableScrollLock: true,
                    }}
                    variant = { 'outlined' } />

            </FormControl>
        </div>
    )
}

Select.defaultProps = {
    className: '',
    margin: SelectMargin.DENSE,
    onChange: undefined,
    label: '',
    readOnly: false,
}
