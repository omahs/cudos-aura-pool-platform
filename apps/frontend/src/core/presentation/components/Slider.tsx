import React from 'react';
import '../styles/slider.css';

type Props = {
    className?: string;
}

export default function Slider({ children, className }: React.PropsWithChildren< Props >) {
    return (
        <div className={`Slider FlexRow RightShadow ${className}`}>
            {children}
        </div>
    )
}
Slider.defaultProps = {
    className: '',
}
