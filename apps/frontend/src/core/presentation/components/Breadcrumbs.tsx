import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import '../styles/breadcrumbs.css';

interface Crumb {
    name: string;
    onClick: () => void;
}

interface Props {
    onClickback: () => void;
    crumbs: Crumb[];
}

export default function Breadcrumbs({ crumbs, onClickback }: Props) {
    const lastCrumb = crumbs[crumbs.length - 1];
    const slicedCrumbds = crumbs.slice(0, -1);

    return (
        <div className={'BreadCrumbs FlexRow'}>
            <div className={'BackButton FlexRow Pointer'} onClick={onClickback}>
                <ArrowBackIcon />
                <div>Back</div>
            </div>
            <div className={'Crumbs FlexRow'}>
                {slicedCrumbds.map((crumb: Crumb, index: number) => <div key={index} className={'CrumbBox FlexRow'}>
                    <div className={'Crumb Pointer'} onClick={crumb.onClick}>{crumb.name}</div>
                    <ArrowForwardIosIcon />
                </div>)}
                <div className={'LastCrumb Pointer'} onClick={lastCrumb.onClick}>{lastCrumb.name}</div>
            </div>
        </div>
    )
}
