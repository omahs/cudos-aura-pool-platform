import React from 'react';
import { CSSProperties } from '@mui/material/styles/createMixins';

import S from '../../utilities/Main';

import Svg from './Svg';
import SvgLoading from '../vectors/loading.svg';
import '../styles/loading-indicator.css';

type Props = {
    className?: string;
    margin?: string;
    size?: string;
    inline?: boolean;
}

export default function LoadingIndicator({ className, margin, size, inline }: Props) {

    const style = {
        'marginTop': margin,
        'marginBottom': margin,
    };
    const svgStyle: CSSProperties = {};

    if (size !== null) {
        svgStyle.width = size;
        svgStyle.height = size;
    }

    return (
        <div
            className = { `LoadingIndicator ${S.CSS.getClassName(inline === false, 'FlexSingleCenter')} ${className}` }
            style = { style } >

            <Svg style = { svgStyle } svg = { SvgLoading } />

        </div>
    );

}

LoadingIndicator.defaultProps = {
    className: '',
    margin: 'auto',
    size: null,
    inline: false,
}
