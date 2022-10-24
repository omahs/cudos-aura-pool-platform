import React from 'react';
import Actions, { ActionsHeight, ActionsLayout } from '../../../../core/presentation/components/Actions';
import BorderShadowPaddingContainer, { ContainerWidth } from '../../../../core/presentation/components/BorderShadowPaddingContainer';

import '../styles/auth-block-layout.css';

type Props = {
    prefix?: React.ReactNode;
    title: React.ReactNode | string;
    subtitle: React.ReactNode | string;
    content?: React.ReactNode;
    subInputsAction?: React.ReactNode;
    actions?: React.ReactNode;
    suffix?: React.ReactNode;
}

export default function AuthBlockLayout({ prefix, title, subtitle, content, subInputsAction, actions, suffix }: Props) {

    return (
        <BorderShadowPaddingContainer className = { 'AuthBlockLayout' } containerWidth = { ContainerWidth.SMALL } >
            { prefix !== null && (
                <div className = { 'Prefix' } > { prefix } </div>
            ) }

            <div className={'Title H2 Bold'}>{ title }</div>
            <div className={'Subtitle'}>{ subtitle }</div>

            { content !== null && (
                <div className = { 'ContentCnt' } >
                    { content }
                </div>
            ) }

            { subInputsAction !== null && (
                <div className = { 'SubInputsAction FlexColumn' } >{ subInputsAction }</div>
            ) }

            { actions !== null && (
                <Actions className = { 'BlockActions' } layout={ActionsLayout.LAYOUT_COLUMN_FULL} height={ActionsHeight.HEIGHT_48}>
                    { actions }
                </Actions>
            ) }

            { suffix !== null && (
                <div className = { 'Suffix' } > { suffix } </div>
            ) }
        </BorderShadowPaddingContainer>
    )

}

AuthBlockLayout.defaultProps = {
    prefix: null,
    content: null,
    subInputsAction: null,
    actions: null,
    suffix: null,
};
