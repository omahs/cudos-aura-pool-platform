import React from 'react';
import S from '../../utilities/Main';
import '../styles/nav-row-tabs.css';

type Props = {
    navTabs: NavTab[];
}

export type NavTab = {
    navName: string;
    isActive: boolean;
    onClick?: () => void;
}

export default function NavRowTabs({ navTabs }: Props) {
    return (
        <div className={'FlexRow NavRowTabs'}>
            {navTabs.map((navStep: NavTab) => <div key={navStep.navName} onClick={navStep.onClick} className={`NavButton Clickable ${S.CSS.getActiveClassName(navStep.isActive === true)}`}>{navStep.navName}</div>)}
        </div>
    )
}
