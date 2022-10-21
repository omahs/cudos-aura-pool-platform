import React from 'react';
import S from '../../utilities/Main';

import '../styles/animation-container.css';

type Props = React.DetailedHTMLProps < React.HTMLAttributes < HTMLDivElement >, HTMLDivElement > & {
    active: boolean,
    className?: string,
}

export default function AnimationContainer({ active, className, children, ...props }: React.PropsWithChildren < Props >) {
    return (
        <div className = { `${className} Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(active)}` } {...props} >
            { active && children }
        </div>
    )
}

AnimationContainer.defaultProps = {
    className: '',
}
