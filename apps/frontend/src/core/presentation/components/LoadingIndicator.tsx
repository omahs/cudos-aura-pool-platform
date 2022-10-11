import React from 'react';
import { CSSProperties } from '@mui/material/styles/createMixins';

import Svg from './Svg';
import SvgLoading from '../vectors/loading.svg';
import '../styles/loading-indicator.css';

type Props = {
    className?: string;
    margin?: string;
    size?: string;
}

export default function LoadingIndicator({ className, margin, size }: Props) {

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
            className = { `LoadingIndicator FlexSingleCenter ${className}` }
            style = { style } >

            <Svg style = { svgStyle } svg = { SvgLoading } />

        </div>
    );

}

LoadingIndicator.defaultProps = {
    className: '',
    margin: 'auto',
    size: null,
}
