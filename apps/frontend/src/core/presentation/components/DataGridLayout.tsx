import React from 'react';

import '../styles/data-grid-layout.css';

type Props = {
    headerLeft: React.ReactNode;
    headerRight: React.ReactNode;
};

export default function DataGridLayout({ headerLeft, headerRight, children }: React.PropsWithChildren < Props >) {

    return (
        <div className={'DataGridLayout'}>
            <div className={'DataGridHeader'}>
                <div className={'DataGridHeaderLeft'}> { headerLeft } </div>
                <div className={'DataGridHeaderRight'}> { headerRight } </div>
            </div>
            { children }
        </div>
    )

}
