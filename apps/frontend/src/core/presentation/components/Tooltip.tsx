import React from 'react';

import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';

import '../styles/tooltip.css';

const Tooltip = (props: TooltipProps) => {

    return (
        <MuiTooltip
            { ...props }
            classes = { {
                'popper': 'TooltipPopper',
                'tooltip': 'TooltipItself',
                'arrow': 'TooltipArrow',
            } }
            enterTouchDelay = { 1 }
            leaveTouchDelay = { 10 * 60 * 1000 } />
    )

}

export default Tooltip;
