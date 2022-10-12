import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

import S from '../../utilities/Main';

import Datepicker from './Datepicker';
import Input from './Input';

import SvgClose from '@mui/icons-material/Close';

type Props = ReactDatePickerProps & {
    label?: string;
    error?: boolean,
}

export default function SingleDatepicker({ label, error, ...props }: Props) {

    const isDateValid = () => {
        return props.selected !== null;
    }

    const onClickClear = (e) => {
        props.onChange(null, e);
        e.stopPropagation();
    }

    const renderInputProps = () => {
        if (props.readOnly === true || isDateValid() === false) {
            return undefined;
        }

        return {
            'endAdornment': (
                <div className={'DateClearButton StartRight SVG Clickable'} onClick = { onClickClear } >
                    <SvgClose />
                </div>
            ),
        }
    }

    return (
        <Datepicker {...props}
            dateFormat = { props.dateFormat ?? 'dd.MM.yyyy' }
            injectTimes = {[
                setTime(23, 59),
            ]}
            customInput = {
                <Input
                    defaultOnChangeParameter = { true }
                    label = { label }
                    error = { error }
                    InputProps = { renderInputProps() } />
            } />
    )

}

SingleDatepicker.defaultProps = {
    label: S.Strings.EMPTY,
    error: false,
};

function setTime(hours, minutes): Date {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}
