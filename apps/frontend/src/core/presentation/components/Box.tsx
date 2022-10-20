import React from 'react';

import '../styles/box.css';

export enum BoxWidth {
    SMALL,
    LARGE,
}

type Props = {
    className?: string;
    boxWidth?: BoxWidth,
}

export default function Box({ className, boxWidth, children }: React.PropsWithChildren < Props >) {
    function cssBoxWidth() {
        switch (boxWidth) {
            case BoxWidth.SMALL:
                return 'BoxWidthSmall';
            case BoxWidth.LARGE:
            default:
                return 'BoxWidthLarge';
        }
    }

    return (
        <div className = { `Box ${className} ${cssBoxWidth()}` } >{ children }</div>
    )
}

Box.defaultProps = {
    className: '',
    boxWidth: BoxWidth.LARGE,
}
