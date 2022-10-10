import React from 'react';

import S from '../../utilities/Main';

import '../styles/scrollable.css';

interface Props {
    className?: string;
    classNameContent?: string;
}

const Scrollable = (props: React.PropsWithChildren < Props >) => {

    return (
        <div className = { `${props.className} Scrollable` } >
            <div className = { 'ScrollableWrapper' } >
                <div className = { `ScrollableContent Scrolls ${props.classNameContent}` } >
                    {props.children}
                </div>
            </div>
        </div>
    )

}

Scrollable.defaultProps = {
    className: S.Strings.EMPTY,
    classNameContent: S.Strings.EMPTY,
};

export default Scrollable;
