import React from 'react'
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';

import Svg from '../../../../core/presentation/components/Svg';
import SvgAuraPoolLogo from '../../../../public/assets/vectors/aura-pool-logo.svg';
import '../styles/page-super-admin-header.css'

function PageSuperAdminHeader() {
    const navigate = useNavigate();

    function onClickLogo() {
        navigate(AppRoutes.HOME);
    }

    return (
        <header className={'PageAdminHeader FlexRow FlexSplit'}>
            <div className={'LogoHeader FlexRow'}>
                <Svg className={'SVG IconLogoWithText Clickable'} svg={ SvgAuraPoolLogo } onClick = { onClickLogo } />
                <div className={'AdminPortalNav B2 SemiBold'}>Super Admin</div>
            </div>
        </header>
    )
}

export default inject((stores) => stores)(observer(PageSuperAdminHeader));
