import React from 'react';
import { createTheme, ThemeProvider, Button as MuiButton } from '@mui/material';

import S from '../../utilities/Main';

import '../styles/button.css';

const theme01 = createTheme({
    palette: {
        primary: {
            main: '#52A6F8',
            contrastText: '#fff',
        },
        secondary: {
            main: '#636D8F',
            contrastText: '#fff',
        },
    },
});

const theme02 = createTheme({
    palette: {
        primary: {
            main: 'rgba(82, 166, 248, 0.1)',
            contrastText: '#52A6F8',
        },
    },
});

export enum BUTTON_TYPE {
    ROUNDED = 'contained',
    TEXT_INLINE = 'text',
}

export enum BUTTON_COLOR {
    SCHEME_1,
    SCHEME_2,
    SCHEME_3,
}

/* each member of the enum corresponds to a CSS class */
export enum BUTTON_PADDING {
    DEFAULT = '',
    PADDING_24 = 'Padding24',
    PADDING_48 = 'Padding48',
}

/* each member of the enum corresponds to a CSS class */
export enum BUTTON_RADIUS {
    DEFAULT = '',
    MAX = 'RadiusMax'
}

type Props = {
    className?: string;
    type?: BUTTON_TYPE;
    color?: BUTTON_COLOR;
    padding?: BUTTON_PADDING;
    radius?: BUTTON_RADIUS;
    disabled?: boolean;
    href?: string,
    target?: string;
    onClick?: () => void;
}

export default function Button({ className, type, color, padding, radius, href, onClick, disabled, target, children }: React.PropsWithChildren < Props >) {

    function cssMuiClassColor() {
        switch (color) {
            case BUTTON_COLOR.SCHEME_2:
                return 'secondary';
            case BUTTON_COLOR.SCHEME_1:
            case BUTTON_COLOR.SCHEME_3:
            default:
                return 'primary';
        }
    }

    function muiTheme() {
        switch (color) {
            case BUTTON_COLOR.SCHEME_1:
            case BUTTON_COLOR.SCHEME_2:
                return theme01;
            default:
                return theme02;
        }
    }

    return (
        <ThemeProvider theme={theme01} >
            <ThemeProvider theme={muiTheme()} >
                <MuiButton
                    disabled={disabled}
                    className={`Button Transition ${padding} ${radius} ${className}`}
                    onClick={onClick}
                    variant={type}
                    color={cssMuiClassColor()}
                    href={href}
                    target={target} >
                    <div className={'ButtonContent FlexRow'} > {children} </div>
                </MuiButton>
            </ThemeProvider>
        </ThemeProvider>

    );
}

Button.defaultProps = {
    className: '',
    type: BUTTON_TYPE.ROUNDED,
    color: BUTTON_COLOR.SCHEME_1,
    padding: BUTTON_PADDING.DEFAULT,
    radius: BUTTON_RADIUS.DEFAULT,
    disabled: false,
    href: undefined,
    target: undefined,
    onClick: undefined,
};
