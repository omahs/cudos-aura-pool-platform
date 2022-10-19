import React from 'react';

import '../styles/explore-page-layout.css';

type Props = {
    header: React.ReactNode,
}

export default function ExplorePageLayout({ header, children }: React.PropsWithChildren < Props >) {

    return (
        <div className = { 'ExplorePageLayout' } >
            <div className = { 'ExplorePageHeader FlexColumn' } > { header } </div>
            <div className = { 'ExplorePageContent' } > { children } </div>
        </div>
    )

}
