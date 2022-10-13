import React from 'react';
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import S from '../../utilities/Main';
import AutocompleteOption from '../../entities/AutocompleteOption';
import Input from './Input';
import Svg from './Svg';

import SvgClear from '@mui/icons-material/Clear';
import SvgArrowDown from '@mui/icons-material/ArrowDownward';
import '../styles/autcomplete.css';

type Props = AutocompleteProps < AutocompleteOption, true, true, false > & {
    label?: string | React.ReactNode;
    error?: boolean;
    readOnly?: boolean;
}

export default function Autocomplete({ className, readOnly, error, label, ...props }: Props) {

    function onChange(event, value, reason) {
        if (props.onChange !== null) {
            props.onChange(value, event, reason);
        }
    }

    return (
        <div className = { `Autocomplete ${className} ${S.CSS.getClassName(readOnly, 'ReadOnly')}` } >
            <MuiAutocomplete
                {...props}
                clearIcon = { <AutocompleteClearIcon /> }
                popupIcon = { <AutocompletePopupIcon /> }
                onChange = { props.onChange !== null && readOnly !== true ? onChange : null }
                getOptionLabel = { getOptionLabel }
                isOptionEqualToValue = { isOptionEqualToValue }
                classes = { {
                    popper: 'AppAutocompletePopup',
                } }
                renderInput = { (params) => (
                    <Input
                        { ...params }
                        label = { label }
                        error = { error } />
                )} />
        </div>
    );
}

Autocomplete.defaultProps = {
    className: '',
    filterSelectedOptions: true,
    label: '',
    error: false,
    readOnly: false,
};

function getOptionLabel(option: AutocompleteOption) {
    return option.label;
}

function isOptionEqualToValue(option: AutocompleteOption, value: AutocompleteOption) {
    return option.value === value.value;
}

function AutocompleteClearIcon(props) {

    return (
        <Svg {...props} svg = { SvgClear } />
    )

}

function AutocompletePopupIcon(props) {

    return (
        <Svg {...props} svg = { SvgArrowDown } />
    )

}
