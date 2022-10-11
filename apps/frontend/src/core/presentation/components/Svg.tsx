import React, { HTMLAttributes } from 'react';

import '../styles/svg.css';

enum Size {
    DEFAULT,
    CUSTOM
}

type Props = HTMLAttributes < HTMLDivElement > & {
    className?: string;
    svg: string,
    size?: Size,
}

export default function Svg({ className, size, svg, ...props }: Props) {

    const cssSize = size === Size.DEFAULT ? '' : 'Size';

    return (
        <div
            { ...props }
            className = { `SVG ${cssSize} ${className}` }
            dangerouslySetInnerHTML = {{ __html: svg }} />
    )

}

Svg.defaultProps = {
    size: Size.DEFAULT,
}
