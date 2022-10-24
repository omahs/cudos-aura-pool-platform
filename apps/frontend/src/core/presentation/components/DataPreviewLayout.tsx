import React from 'react';

import BorderShadowPaddingContainer, { ContainerBackground, ContainerPadding } from './BorderShadowPaddingContainer';

import '../styles/data-preview-layout.css';

export enum DataRowsGap {
    GAP_10 = 'Gap10',
    GAP_25 = 'Gap25',
}

type DataPreview = {
    key: string; /* do not set it to React.ReactNode unless we remove it as a key from render function */
    value: React.ReactNode | string;
}

type Props = {
    dataPreviews: DataPreview[];
    gap?: DataRowsGap;
    containerBackground?: ContainerBackground,
}

export function createDataPreview(key: string, value: React.ReactNode | string): DataPreview {
    return {
        key, value,
    }
}

export default function DataPreviewLayout({ dataPreviews, gap, containerBackground, children }: React.PropsWithChildren < Props >) {

    return (
        <BorderShadowPaddingContainer
            className = { `DataPreviewLayout ${gap} FlexColumn` }
            containerShadow = { false }
            containerBackground = { containerBackground }
            containerPadding = { ContainerPadding.PADDING_24 } >
            { dataPreviews.map((dataPreview: DataPreview) => {
                return (
                    <div key = { dataPreview.key } className = { 'DataPreview FlexRow  B1 SemiBold' } >
                        <div className = { 'DataPreviewKey' } > { dataPreview.key } </div>
                        <div className = { 'DataPreviewValue Dots' } > { dataPreview.value } </div>
                    </div>
                )
            }) }
            {children}
        </BorderShadowPaddingContainer>
    )

}

DataPreviewLayout.defaultProps = {
    gap: DataRowsGap.GAP_10,
}
