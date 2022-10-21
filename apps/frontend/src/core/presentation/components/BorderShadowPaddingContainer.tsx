import React from 'react';

import '../styles/border-shadow-padding-container.css';

export enum ContainerWidth {
    SMALL,
    MEDIUM,
    LARGE,
}

type Props = {
    className?: string;
    containerWidth?: ContainerWidth,
}

export default function BorderShadowPaddingContainer({ className, containerWidth, children }: React.PropsWithChildren < Props >) {

    function cssBoxWidth() {
        switch (containerWidth) {
            case ContainerWidth.SMALL:
                return 'WidthSmall';
            case ContainerWidth.MEDIUM:
                return 'WidthMedium';
            case ContainerWidth.LARGE:
            default:
                return 'WidthLarge';
        }
    }

    return (
        <div className={`BorderShadowPaddingContainer ${cssBoxWidth()} ${className}`}>
            {children}
        </div>
    )
}

BorderShadowPaddingContainer.defaultProps = {
    className: '',
    boxWidth: ContainerWidth.LARGE,
}
