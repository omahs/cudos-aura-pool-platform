import React, { useState } from 'react';
import moment from 'moment';
import { ReactDatePickerProps } from 'react-datepicker';

import S from '../../utilities/Main';

import Datepicker from './Datepicker';

import SvgClose from '@mui/icons-material/Close';
import '../styles/range-datepicker.css'

interface Props extends ReactDatePickerProps {
    datepickerState: RangeDatepickerState;
    dateRangeFormat?: string;
    emptyDateString?: string;
    onChange: any;
    label?: string;
    className?: string;
}

const RangeDatepicker = (props: Props) => {

    const [datepickerOpen, setDatepickerOpen] = useState(props.datepickerState.open);

    const onChangeOpen = () => {
        setDatepickerOpen(!datepickerOpen);
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        const open = end === null;

        const startTime = isDateValid(start) ? start.getTime() : S.NOT_EXISTS;
        const endTime = isDateValid(end) ? end.getTime() : S.NOT_EXISTS;

        props.onChange(startTime, endTime);

        setDatepickerOpen(open);
    }

    const isDateValid = (date) => {
        return date !== null && date !== S.NOT_EXISTS;
    }

    const formatDate = (date) => {
        if (isDateValid(date) === true) {
            return moment(new Date(date)).format(props.dateRangeFormat);
        }

        if (props.emptyDateString !== S.Strings.EMPTY) {
            return props.emptyDateString;
        }

        return (
            <div dangerouslySetInnerHTML = {{ __html: '&nbsp;' }} />
        )
    }

    const onClickClearDates = (e) => {
        props.onChange(S.NOT_EXISTS, S.NOT_EXISTS);
        setDatepickerOpen(false);
        e.stopPropagation();
    }

    const { className, ...innerProps } = props;
    return (
        <Datepicker
            {...innerProps}
            selectsRange = { true }
            popperClassName = { 'RangeDatepickerPopper' }
            wrapperClassName = { `RangeDatepickerWrapper ${S.CSS.getClassName(props.disabled, 'Disabled')}` }
            onInputClick = {onChangeOpen}
            onClickOutside = {onChangeOpen}
            open = {datepickerOpen}
            startDate = {isDateValid(props.datepickerState.startDate) ? new Date(props.datepickerState.startDate) : null}
            endDate = {isDateValid(props.datepickerState.endDate) ? new Date(props.datepickerState.endDate) : null}
            onChange = {onChange}
            customInput = {
                <fieldset className={'DatePickerInput FlexRow FlexSplit'}>
                    { props.label !== S.Strings.EMPTY && (
                        <>
                            <legend className = {'DatePickerFieldLabel'}>{ props.label }</legend>
                        </>
                    )}
                    <div className={'DatePickerSmallLetters'}>от</div>
                    <div className={'DatePickerInputText'}> { formatDate(props.datepickerState.startDate) } </div>
                    <div className={'DatePickerSmallLetters'}>до</div>
                    <div className={'DatePickerInputText'}> { formatDate(props.datepickerState.endDate) } </div>
                    {isDateValid(props.datepickerState.startDate)
                        ? <div onClick={onClickClearDates} className={'DateClearButton StartRight SVG Clickable'}>
                            <SvgClose />
                        </div> : ''}
                </fieldset>
            }
        />
    )

}

RangeDatepicker.defaultProps = {
    emptyDateString: S.Strings.EMPTY,
    dateRangeFormat: 'DD.MM.YYYY',
    label: S.Strings.EMPTY,
    className: S.Strings.EMPTY,
};

export default RangeDatepicker;

export class RangeDatepickerState {

    startDate: number;
    endDate: number;
    open: boolean;

    constructor(startDate: number = S.NOT_EXISTS, endDate: number = S.NOT_EXISTS, open = false) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.open = open;
    }

}
