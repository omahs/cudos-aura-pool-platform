import React from 'react';

import '../styles/data-grid-layout.css';

type Props = {
    header: React.ReactNode;
};

export default function DataGridLayout({ header, children }: React.PropsWithChildren < Props >) {

    return (
        <div className={'DataGridLayout'}>
            <div className={'DataGridHeader'}> { header } </div>
            { children }
        </div>
    )

}
