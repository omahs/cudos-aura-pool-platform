import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

import S from '../../utilities/Main';

import Datepicker from './Datepicker';
import { Input } from '@mui/material';

import SvgClose from '@mui/icons-material/Close';

type Props = ReactDatePickerProps & {
    emptyDateString?: string;
    error?: boolean,
}

export default function SingleDatepicker({ emptyDateString, error, ...props }: Props) {

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
                    <Svg svg={SvgClose} />
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
                    error = { error }
                    { ...renderInputProps() } />
            }
        />
    )

}

SingleDatepicker.defaultProps = {
    emptyDateString: S.Strings.EMPTY,
    error: false,
};

function setTime(hours, minutes): Date {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}
