import React, { useEffect, useRef } from 'react';

import S from '../../utilities/Main'
import MuiPopover, { PopoverProps } from '@mui/material/Popover';

import '../styles/popover.css';

const Popover = (props: PopoverProps) => {

    const ref = useRef(null);

    useEffect(() => {
        document.addEventListener('wheel', onPreventableScroll, { passive: false });
        document.addEventListener('touchmove', onPreventableScroll, { passive: false });
        document.addEventListener('scroll', onUnpreventableScroll);

        return () => {
            document.removeEventListener('wheel', onPreventableScroll);
            document.removeEventListener('touchmove', onPreventableScroll);
            document.removeEventListener('scroll', onUnpreventableScroll);
        }
    }, [])

    const onPreventableScroll = (e) => {
        if (props.open === true) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    const onUnpreventableScroll = (e) => {
        if (props.open === true) {
            props.onClose(e, 'backdropClick');
        }
    }

    const onEntered = () => {
        ref.current.querySelector('.MuiPopover-paper').addEventListener('wheel', S.stopPropagation);
    }

    const onExit = () => {
        ref.current.querySelector('.MuiPopover-paper').removeEventListener('wheel', S.stopPropagation);
    }

    return (
        <MuiPopover
            {...props}
            ref = { ref }
            disableScrollLock = { true }
            className = { 'Popover' }
            onEntered = { onEntered }
            onExit = { onExit } >
            { props.children }
        </MuiPopover>
    )

}

Popover.defaultProps = {
    'anchorOrigin': {
        vertical: 'bottom',
        horizontal: 'center',
    },
    'transformOrigin': {
        vertical: 'top',
        horizontal: 'center',
    },
};

export default Popover;
