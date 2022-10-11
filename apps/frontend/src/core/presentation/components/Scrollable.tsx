import React from 'react';

import S from '../../utilities/Main';

import '../styles/scrollable.css';

type Props = {
    className?: string;
    classNameContent?: string;
}

export default function Scrollable({ className, classNameContent, children }: React.PropsWithChildren < Props >) {

    return (
        <div className = { `${className} Scrollable` } >
            <div className = { 'ScrollableWrapper' } >
                <div className = { `ScrollableContent Scrolls ${classNameContent}` } >
                    {children}
                </div>
            </div>
        </div>
    )

}

Scrollable.defaultProps = {
    className: S.Strings.EMPTY,
    classNameContent: S.Strings.EMPTY,
};
