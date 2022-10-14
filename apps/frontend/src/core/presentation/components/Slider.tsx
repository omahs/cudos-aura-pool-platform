import React from 'react';
import '../styles/slider.css';

interface Props {

}

export default function Slider({ children }: React.PropsWithChildren< Props >) {
    return (
        <div className={'Slider FlexRow RightShadow'}>
            {children}
        </div>
    )
}
