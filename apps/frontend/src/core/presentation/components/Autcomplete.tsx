import React from 'react';
import { FormControl, Popper, TextField } from '@mui/material';
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

import S from '../../utilities/Main';
import AutocompleteOption from '../../entities/AutocompleteOption';

import '../styles/autcomplete.css';

export enum AutocompleteMargin {
    NORMAL = 1,
    DENSE = 2,
    NONE = 3,
}

type Props = AutocompleteProps < AutocompleteOption, true, true, false > & {
    label?: string;
    error?: boolean;
    margin?: AutocompleteMargin;
    readOnly?: boolean;
}

export default function Autocomplete({ className, readOnly, error, label, ...props }: Props) {

    function onChange(event, value, reason) {
        props.onChange(value, event, reason);
    }

    function getMargin() {
        switch (props.margin) {
            case AutocompleteMargin.DENSE:
                return 'dense';
            case AutocompleteMargin.NONE:
                return 'none';
            case AutocompleteMargin.NORMAL:
            default:
                return 'normal';
        }
    }

    function getOptionLabel(option: AutocompleteOption) {
        return option.label;
    }

    function isOptionEqualToValue(option: AutocompleteOption, value: AutocompleteOption) {
        return option.value === value.value;
    }

    return (
        <div className = { `Autocomplete ${className} ${S.CSS.getClassName(readOnly, 'ReadOnly')}` } >
            <FormControl variant = { 'outlined' } margin = { getMargin() } >
                <MuiAutocomplete
                    {...props}
                    PopperComponent = { AutocompletePopper }
                    onChange = { props.onChange !== null && readOnly !== true ? onChange : null }
                    getOptionLabel = { getOptionLabel }
                    isOptionEqualToValue = { isOptionEqualToValue }
                    renderInput = { (params) => (
                        <TextField
                            { ...params }
                            variant = { 'outlined' }
                            label = { label }
                            error = { error } />
                    )} />
            </FormControl>
        </div>
    );
}

Autocomplete.defaultProps = {
    className: '',
    filterSelectedOptions: true,
    label: '',
    error: false,
    margin: AutocompleteMargin.DENSE,
    readOnly: false,
};

function AutocompletePopper(props) {

    return (
        <Popper id = { 'autocomplete-popper' } {...props} />
    );

}
