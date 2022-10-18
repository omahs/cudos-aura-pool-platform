import React from 'react';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

import '../styles/not-found-page.css';

export default function NotFoundPage() {

    return (
        <PageLayoutComponent className = { 'NotFoundPage' } >
            <div className = { 'H1 FlexSingleCenter' } >Page not found</div>
        </PageLayoutComponent>
    )

}
