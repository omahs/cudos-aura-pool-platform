import React from 'react';
import S from '../../utilities/Main';
import '../styles/nav-row.css';

type Props = {
    navSteps: NavStep[];
}

export type NavStep = {
    navNumber: number;
    navName: string;
    isActive: boolean;
}

export default function NavRow({ navSteps }: Props) {
    return (
        <div className={'FlexRow NavBar'}>
            {navSteps.map((navStep: NavStep) => {
                return (<div
                    key={navStep.navNumber}
                    className={`FlexColumn NavItem ${S.CSS.getActiveClassName(navStep.isActive === true)}`}>
                    <div className={'NavNumber B3 FlexRow'}>{navStep.navNumber}</div>
                    <div className={'B3 SemiBold'}>{navStep.navName}</div>
                </div>)
            })}
            <div className={'HorizontalSeparator'} />
        </div>
    )
}
