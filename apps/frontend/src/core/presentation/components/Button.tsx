import React, { ReactNode } from 'react';
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

interface Props {
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

export default function Button(props: Props) {

    function cssMuiClassColor() {
        switch (props.color) {
            case BUTTON_COLOR.SCHEME_2:
                return 'secondary';
            case BUTTON_COLOR.SCHEME_1:
            case BUTTON_COLOR.SCHEME_3:
            default:
                return 'primary';
        }
    }

    function muiVariant() {
        switch (props.type) {
            case BUTTON_TYPE.TEXT_INLINE:
                return 'text';
            case BUTTON_TYPE.ROUNDED:
            default:
                return 'contained';
        }
    }

    function muiTheme() {
        switch (props.color) {
            case BUTTON_COLOR.SCHEME_1:
            case BUTTON_COLOR.SCHEME_2:
                return theme01;
            default:
                return theme02;
        }
    }

    function cssPadding() {
        switch (props.padding) {
            case BUTTON_PADDING.PADDING_24:
                return 'Padding24';
            case BUTTON_PADDING.PADDING_48:
                return 'Padding48';
            default:
                return S.Strings.EMPTY;
        }
    }

    function cssRadius() {
        switch (props.radius) {
            case BUTTON_RADIUS.MAX:
                return 'Radius30';
            case BUTTON_RADIUS.DEFAULT:
            default:
                return S.Strings.EMPTY;
        }
    }
    const className = `Button Transition ${cssPadding()} ${cssRadius()} ${props.className}`;

    return (
        <ThemeProvider theme={theme01} >
            <ThemeProvider theme={muiTheme()} >
                <MuiButton
                    disabled={props.disabled}
                    className={className}
                    onClick={props.onClick}
                    variant={muiVariant()}
                    color={cssMuiClassColor()}
                    href={props.href}
                    target={props.target} >

                    <div className={'ButtonContent FlexRow'} >
                        {props.children}
                    </div>
                </MuiButton>
            </ThemeProvider>
        </ThemeProvider>

    );
}
