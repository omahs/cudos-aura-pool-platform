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

// this is not used
const theme02 = createTheme({
    palette: {
        primary: {
            main: 'rgba(82, 166, 248, 0.1)',
            contrastText: '#52A6F8',
        },
    },
});

export enum BUTTON_TYPE {
    ROUNDED,
    TEXT_INLINE,
}

export enum BUTTON_COLOR {
    SCHEME_1,
    SCHEME_2,
    SCHEME_3,
}

export enum BUTTON_PADDING {
    DEFAULT,
    PADDING_24,
    PADDING_48,
}

export enum BUTTON_RADIUS {
    DEFAULT,
    MAX
}

type Props = {
    className?: string;
    type?: BUTTON_TYPE;
    color?: BUTTON_COLOR;
    padding?: BUTTON_PADDING;
    radius?: BUTTON_RADIUS;
    href?: string,
    onClick?: () => void;
    disabled?: boolean;
    target?: string;
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

    function muiVariant() {
        switch (type) {
            case BUTTON_TYPE.TEXT_INLINE:
                return 'text';
            case BUTTON_TYPE.ROUNDED:
            default:
                return 'contained';
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

    function cssPadding() {
        switch (padding) {
            case BUTTON_PADDING.PADDING_24:
                return 'Padding24';
            case BUTTON_PADDING.PADDING_48:
                return 'Padding48';
            default:
                return S.Strings.EMPTY;
        }
    }

    function cssRadius() {
        switch (radius) {
            case BUTTON_RADIUS.MAX:
                return 'Radius30';
            case BUTTON_RADIUS.DEFAULT:
            default:
                return S.Strings.EMPTY;
        }
    }

    return (
        <ThemeProvider theme={theme01} >
            <ThemeProvider theme={muiTheme()} >
                <MuiButton
                    disabled={disabled}
                    className={`Button Transition ${cssPadding()} ${cssRadius()} ${className}`}
                    onClick={onClick}
                    variant={muiVariant()}
                    color={cssMuiClassColor()}
                    href={href}
                    target={target} >

                    <div className={'ButtonContent FlexRow'} >
                        {children}
                    </div>
                </MuiButton>
            </ThemeProvider>
        </ThemeProvider>

    );
}

Button.defaultProps = {
    className: '',
    color: BUTTON_COLOR.SCHEME_1,
    padding: BUTTON_PADDING.PADDING_24,
    radius: BUTTON_RADIUS.DEFAULT,
    href: undefined,
    onClick: undefined,
    disabled: false,
    target: undefined,
};
