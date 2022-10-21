import React from 'react';
import '../styles/border-shadow-padding-container.css';

type Props = {
    className?: string;
}

export default function BorderShadowPaddingContainer({ className, children }: React.PropsWithChildren< Props >) {
    return (
        <div className={`BorderShadowPaddingContainer ${className}`}>
            {children}
        </div>
    )
}
