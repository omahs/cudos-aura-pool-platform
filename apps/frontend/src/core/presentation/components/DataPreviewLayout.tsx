import React from 'react';

import BorderShadowPaddingContainer, { ContainerPadding } from './BorderShadowPaddingContainer';

import '../styles/data-preview-layout.css';

type DataPreview = {
    key: string; /* do not set it to React.ReactNode unless we remove it as a key from render function */
    value: React.ReactNode | string;
}

type Props = {
    dataPreviews: DataPreview[];
}

export function createDataPreview(key: string, value: React.ReactNode | string): DataPreview {
    return {
        key, value,
    }
}

export default function DataPreviewLayout({ dataPreviews }: Props) {

    return (
        <BorderShadowPaddingContainer
            className = { 'DataPreviewLayout' }
            containerShadow = { false }
            containerPadding = { ContainerPadding.PADDING_24 } >
            { dataPreviews.map((dataPreview: DataPreview) => {
                return (
                    <div key = { dataPreview.key } className = { 'DataPreview FlexRow' } >
                        <div className = { 'DataPreviewKey' } > { dataPreview.key } </div>
                        <div className = { 'DataPreviewValue Dots' } > { dataPreview.value } </div>
                    </div>
                )
            }) }
        </BorderShadowPaddingContainer>
    )

}
