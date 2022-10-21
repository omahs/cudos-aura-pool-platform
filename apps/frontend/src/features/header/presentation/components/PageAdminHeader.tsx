import React from 'react'
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';

import Svg from '../../../../core/presentation/components/Svg';
import HeaderWallet from './HeaderWallet';

import SvgAuraPoolLogo from '../../../../public/assets/vectors/aura-pool-logo.svg';
import '../styles/page-admin-header.css'

type Props = {
    accountSessionStore?: AccountSessionStore;
};

function PageAdminHeader({ accountSessionStore }: Props) {

    const navigate = useNavigate();

    function onClickLogo() {
        navigate(AppRoutes.HOME);
    }

    return (
        <header className={'PageAdminHeader FlexRow FlexSplit'}>
            <div className={'LogoHeader FlexRow'}>
                <Svg className={'SVG IconLogoWithText Clickable'} svg={ SvgAuraPoolLogo } onClick = { onClickLogo } />
                <div className={'AdminPortalNav B2 SemiBold'}>Admin Portal</div>
            </div>

            { accountSessionStore.isAdmin() === true && (
                <HeaderWallet />
            ) }
        </header>
    )
}

export default inject((stores) => stores)(observer(PageAdminHeader));
