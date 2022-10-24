import React from 'react';
import Actions, { ActionsHeight, ActionsLayout } from '../../../../core/presentation/components/Actions';
import BorderShadowPaddingContainer, { ContainerWidth } from '../../../../core/presentation/components/BorderShadowPaddingContainer';

import '../styles/auth-block-layout.css';

type Props = {
    title: React.ReactNode | string;
    subtitle: React.ReactNode | string;
    inputs?: React.ReactNode;
    subInputsAction?: React.ReactNode;
    actions: React.ReactNode;
}

export default function AuthBlockLayout({ title, subtitle, inputs, subInputsAction, actions }: Props) {

    return (
        <BorderShadowPaddingContainer className = { 'AuthBlockLayout' } containerWidth = { ContainerWidth.SMALL } >
            <div className={'Title H2 Bold'}>{ title }</div>
            <div className={'Subtitle'}>{ subtitle }</div>

            { inputs !== null && (
                <div className = { 'InputsCnt' } >
                    { inputs }
                </div>
            ) }

            { subInputsAction !== null && (
                <div className = { 'SubInputsAction FlexColumn' } >{ subInputsAction }</div>
            ) }

            <Actions className = { 'BlockActions' } layout={ActionsLayout.LAYOUT_COLUMN_FULL} height={ActionsHeight.HEIGHT_48}>
                { actions }
            </Actions>
        </BorderShadowPaddingContainer>
    )

}

AuthBlockLayout.defaultProps = {
    inputs: null,
    subInputsAction: null,
};
