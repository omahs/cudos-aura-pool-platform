// version 3.0.0
import React from 'react';

import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
import enGb from 'date-fns/locale/en-GB';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css'

export default function Datepicker(props: ReactDatePickerProps) {

    return (
        <div>
            <ReactDatepicker {...props} locale = { enGb } />
        </div>
    )

}
