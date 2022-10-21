import React from 'react';
import S from '../../utilities/Main';

type Props = {
    active: boolean,
    className?: string,
}

export default function AnimationContainer({ active, className, children }: React.PropsWithChildren < Props >) {
    return (
        <div className = { `${className} Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(active)}` } >
            { active && children }
        </div>
    )
}

AnimationContainer.defaultProps = {
    className: '',
}
