import React from 'react';

import SvgInfo from '@mui/icons-material/InfoOutlined';
import Tooltip from './Tooltip';

import '../styles/text-with-tooltip.css';

type Props = {
    className?: string;
    text?: string;
    tooltipText?: string;
}

export default function TextWithTooltip({ className, text, tooltipText }: Props) {

    return (
        <div className={`FlexRow TextWithTooltip ${className}`}>
            <div className={'TooltipText'}>{text}</div>
            <Tooltip title = { tooltipText } >
                {/* <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgInfo }}/> */}
                <SvgInfo />
            </Tooltip>
        </div>
    );
}
