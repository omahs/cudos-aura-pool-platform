import React from 'react';
import { FormControl, Popper } from '@mui/material';
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import S from '../../utilities/Main';
import AutocompleteOption from '../../entities/AutocompleteOption';

import '../styles/autcomplete.css';
import Input from './Input';

type Props = AutocompleteProps < AutocompleteOption, true, true, false > & {
    label?: string;
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
            {/* <FormControl variant = { 'outlined' } margin = { 'dense' } > */}
            <MuiAutocomplete
                {...props}
                PopperComponent = { AutocompletePopper }
                onChange = { props.onChange !== null && readOnly !== true ? onChange : null }
                getOptionLabel = { getOptionLabel }
                isOptionEqualToValue = { isOptionEqualToValue }
                renderInput = { (params) => (
                    <Input
                        { ...params }
                        label = { label }
                        error = { error } />
                )} />
            {/* </FormControl> */}
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

function AutocompletePopper(props) {

    return (
        <Popper id = { 'autocomplete-popper' } {...props} />
    );

}
