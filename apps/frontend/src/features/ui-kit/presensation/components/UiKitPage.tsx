import React from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';

import AlertStore from '../../../../core/presentation/stores/AlertStore';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

import '../styles/ui-kit-page.css';
import Actions from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_COLOR, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import Input from '../../../../core/presentation/components/Input';
import Select from '../../../../core/presentation/components/Select';
import { MenuItem } from '@mui/material'
import Tooltip from '../../../../core/presentation/components/Tooltip';
import TextWithTooltip from '../../../../core/presentation/components/TextWithTooltip';

interface Props {
    alertStore?: AlertStore;
}

const UiKitPage = (props: Props) => {
    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate(AppRoutes.NOT_FOUND);
    }

    const onClickShowAlert = () => {
        props.alertStore.show('Alert');
    }

    return (
        <PageLayoutComponent
            className = { 'UiKitPage' }
            modals = { [
            ] } >
            <div className={'FlexRow'} style={{
                gap: '20px',
                padding: '100px',
                background: 'var(--color-primary)',
            }}>
                <div className={'H1'}>Heading 1</div>
                <div className={'H2'}>Heading 2</div>
                <div className={'H2_1'}>Heading 2.1</div>
                <div className={'H3'}>Heading 3</div>
                <div className={'B1'}>Body 1</div>
                <div className={'B2'}>Body 2</div>
                <div className={'B3'}>Body 3</div>
                <div className={'B4'}>Body 4</div>
            </div>
            <div style = { { 'width': '1000px', 'height': '500px', 'margin': 'auto' } } className = { 'FlexSingleCenter FlexColumn' } >
                <Input
                    label = { 'test' } />

                <Input
                    label = { 'test' } error />

                <Select
                    label = { 'test' } >
                    <MenuItem value = { 1 } >1</MenuItem>
                    <MenuItem value = { 2 } >2</MenuItem>
                </Select>

                <Select
                    label = { 'test' }
                    error >
                    <MenuItem value = { 1 } >1</MenuItem>
                    <MenuItem value = { 2 } >2</MenuItem>
                </Select>

                <Actions>
                    <Button type = {BUTTON_TYPE.ROUNDED } color = { BUTTON_COLOR.SCHEME_1 } >button 01</Button>
                    <Button type = {BUTTON_TYPE.ROUNDED } color = { BUTTON_COLOR.SCHEME_2 } >button 02</Button>
                    <Button type = { BUTTON_TYPE.TEXT_INLINE } color = { BUTTON_COLOR.SCHEME_1 } >button 03</Button>
                    <Button type = { BUTTON_TYPE.TEXT_INLINE } color = { BUTTON_COLOR.SCHEME_2 } >button 04</Button>
                </Actions>
            </div>
            <Tooltip title = { 'some info' } arrow ><span>TOOLTIP</span></Tooltip>
            <TextWithTooltip text='TEXT WITH TOOLTIP' tooltipText='TOOLTIP TEXT' />
            <span onClick = { onClickNavigate } >UiKitPage</span>
            <span onClick = { onClickShowAlert } >show alert</span>
        </PageLayoutComponent>
    )

}

export default inject('alertStore')(observer(UiKitPage));
