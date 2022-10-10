import React, { useState, useEffect } from 'react';
import { Select as MuiSelect, SelectProps, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import SvgArrowDown from '@mui/icons-material/ArrowDownward';
import '../styles/select.css';

export enum SelectMargin {
    NORMAL,
    DENSE,
}

interface Props extends SelectProps {
    className?: string;
    margin?: SelectMargin;
    onChange?: (value: any) => (boolean | void);
    label?: string;
    readOnly?: boolean;
}

export default function Select(props: Props) {

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
    }, [])

    const onChange = (e: SelectChangeEvent<unknown>) => {
        if (props.onChange !== undefined) {
            props.onChange(e.target.value);
        }
    }

    const onPreventableScroll = (e) => {
        if (open === true) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const onUnpreventableScroll = () => {
        if (open === true) {
            onClose();
        }
    }

    function getMargin() {
        switch (props.margin) {
            case SelectMargin.DENSE:
                return 'dense';
            case SelectMargin.NORMAL:
            default:
                return 'none';
        }
    }

    const onOpen = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
        setTimeout(() => {
            document.activeElement.blur();
        }, 0);
    }

    const margin = getMargin();

    return (
        <div className = { `Select ${props.className}` }>
            <FormControl variant = 'outlined' margin = { margin }>

                <InputLabel
                    error = { props.error }
                    variant = { 'outlined' }
                    margin = { margin } >
                    { props.label }
                </InputLabel>
                <MuiSelect
                    { ...props }
                    onChange = { props.onChange !== null && props.readOnly !== true ? onChange : undefined }
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
