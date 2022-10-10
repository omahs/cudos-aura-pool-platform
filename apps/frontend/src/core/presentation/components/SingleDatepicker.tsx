import React from 'react';
import { ReactDatePickerProps } from 'react-datepicker';

import S from '../../utilities/Main';

import Datepicker from './Datepicker';
import { Input } from '@mui/material';

import SvgClose from '@mui/icons-material/Close';

interface Props extends ReactDatePickerProps {
    emptyDateString?: string;
    error?: boolean,
}

const SingleDatepicker = (props: Props) => {

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
                    error = { props.error }
                    { ...renderInputProps() } />
            }
        />
    )

}

SingleDatepicker.defaultProps = {
    emptyDateString: S.Strings.EMPTY,
};

export default SingleDatepicker;

function setTime(hours, minutes): Date {
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}
