import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AutocompleteOption from '../../../../core/entities/AutocompleteOption';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import SingleDatepicker from '../../../../core/presentation/components/SingleDatepicker';
import RangeDatepicker, { RangeDatepickerState } from '../../../../core/presentation/components/RangeDatepicker';
import Autocomplete from '../../../../core/presentation/components/Autcomplete';

import '../styles/not-found-page.css';

export default function NotFoundPage() {

    const navigate = useNavigate();
    const [range, setRange] = useState(new RangeDatepickerState(Date.now() - 1000000, Date.now(), false));
    const [single, setSingle] = useState(new Date());
    const [autocomplete, setAutocomplete] = useState(null);

    const onClickNavigate = () => {
        navigate(AppRoutes.HOME);
    }

    return (
        <PageLayoutComponent className = { 'NotFoundPage' } >
            <span onClick = { onClickNavigate } >NotFoundPage</span>
            <RangeDatepicker
                datepickerState = { range }
                onChange = { (start, end) => {
                    setRange(new RangeDatepickerState(start, end, false))
                } } />
            <SingleDatepicker
                selected = { single }
                onChange = { (d) => {
                    setSingle(d);
                } } />
            <Autocomplete
                value = { autocomplete }
                onChange = { (d) => {
                    setAutocomplete(d);
                }}
                options = { [
                    new AutocompleteOption(1, 'One'),
                    new AutocompleteOption(2, 'Two'),
                ] } />
        </PageLayoutComponent>
    )

}
