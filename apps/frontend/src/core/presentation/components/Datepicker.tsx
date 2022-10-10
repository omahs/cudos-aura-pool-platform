// version 3.0.0
import React from 'react';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/datepicker.css'

import ReactDatepicker, { ReactDatePickerProps } from 'react-datepicker';
import enGb from 'date-fns/locale/en-GB';

const Datepicker = (props: ReactDatePickerProps) => {

    return (
        <div>
            <ReactDatepicker {...props} locale = { enGb } />
        </div>
    )

}

export default Datepicker;
