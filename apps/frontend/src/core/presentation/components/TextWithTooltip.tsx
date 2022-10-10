import React from 'react';

import SvgInfo from '@mui/icons-material/InfoOutlined';

import '../styles/text-with-tooltip.css';
import Tooltip from './Tooltip';

interface Props {
    className?: string;
    text?: string;
    tooltipText?: string;
}

export default function TextWithTooltip(props: Props) {

    return (
        <div className={`FlexRow TextWithTooltip ${props.className}`}>
            <div className={'TooltipText'}>{props.text}</div>
            <Tooltip title = { props.tooltipText } >
                {/* <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgInfo }}/> */}
                <SvgInfo />
            </Tooltip>
        </div>
    );
}
