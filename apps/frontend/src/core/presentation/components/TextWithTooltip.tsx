import React from 'react';

import SvgInfo from '@mui/icons-material/InfoOutlined';
import Tooltip from './Tooltip';
import Svg, { SvgSize } from './Svg';

import '../styles/text-with-tooltip.css';

type Props = {
    className?: string;
    text?: string;
    tooltipText?: string;
}

export default function TextWithTooltip({ className, text, tooltipText }: Props) {

    return (
        <div className={`FlexRow TextWithTooltip ${className}`}>
            <div className={'TooltipText'} > {text} </div>
            <Tooltip title = { tooltipText } >
                <Svg className = { 'SvgTooltip' } size = { SvgSize.CUSTOM } svg = { SvgInfo } />
            </Tooltip>
        </div>
    );
}

TextWithTooltip.defaultProps = {
    className: '',
    text: '',
    tooltipText: '',
}
