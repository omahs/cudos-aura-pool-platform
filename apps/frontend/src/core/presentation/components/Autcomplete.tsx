import { FormControl, Popper, TextField } from '@mui/material';
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import React from 'react';

import S from '../../utilities/Main';

import '../styles/autcomplete.css';

export class AutocompleteOption {

    value: any;
    label: any;

    constructor(value: any, label: any = null) {
        if (label === null) {
            label = value;
        }

        this.value = value;
        this.label = label;
    }

}

export enum AutocompleteMargin {
    NORMAL = 1,
    DENSE = 2,
    NONE = 3,
}

interface Props extends AutocompleteProps < AutocompleteOption, true, true, false > {
    label?: string;
    error?: boolean;
    margin?: AutocompleteMargin;
    readOnly?: boolean;
}

const Autocomplete = (props: Props) => {

    const onChange = (event, value, reason) => {
        props.onChange(value, event, reason);
    }

    const getMargin = () => {
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

    const getOptionLabel = (option: AutocompleteOption) => {
        return option.label;
    }

    const isOptionEqualToValue = (option: AutocompleteOption, value: AutocompleteOption) => {
        return option.value === value.value;
    }

    const margin = getMargin();
    const { className, readOnly, error, label, ...innerProps } = props;
    return (
        <div className = { `Autocomplete ${className} ${S.CSS.getClassName(readOnly, 'ReadOnly')}` } >
            <FormControl variant = { 'outlined' } margin = { margin } >
                <MuiAutocomplete
                    {...innerProps}
                    PopperComponent = { AutocompletePopper }
                    onChange = { props.onChange !== null && props.readOnly !== true ? onChange : null }
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
    'className': S.Strings.EMPTY,
    'margin': AutocompleteMargin.DENSE,
    'filterSelectedOptions': true,
};

export default Autocomplete;

const AutocompletePopper = (props) => {

    return (
        <Popper id = { 'autocomplete-popper' } {...props} />
    );

}
