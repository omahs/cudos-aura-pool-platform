import Svg from '../../../../core/presentation/components/Svg';
import SvgAuraPoolLogo from '../../../../public/assets/vectors/aura-pool-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';

import React, { useState } from 'react'
import '../styles/page-header.css'
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import S from '../../../../../src/core/utilities/Main';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import { inject, observer } from 'mobx-react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '../../../../core/presentation/components/Popover';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import ProjectUtils from '../../../../core/utilities/ProjectUtils';
import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';

interface Props {
    accountSessionStore?: AccountSessionStore,
    walletStore?: WalletStore
}

function PageHeader({ accountSessionStore, walletStore }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    function isLocationMarketplace(): boolean {
        return location.pathname !== AppRoutes.REWARDS_CALCULATOR && location.pathname !== AppRoutes.USER_PROFILE
    }

    function onClickAddress() {
        navigate(`${AppRoutes.USER_PROFILE}/${walletStore.getAddress()}`)
    }

    function onClickAddressMenu(event) {
        setAnchorEl(event.target.parentNode.parentNode);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    function onClickLogo() {
        navigate(AppRoutes.MARKETPLACE);
    }

    function onClickCopyAddress() {
        ProjectUtils.copyText(walletStore.address)
    }

    async function onClickDisconnect() {
        await accountSessionStore.logout();
        setAnchorEl(null);
    }

    async function onClickLogin() {
        await walletStore.connectKeplr();

        // prepare a signed tx for register
        await accountSessionStore.login('', '', walletStore.getAddress(), '');
    }

    const open = Boolean(anchorEl);

    return (
        <footer className={'PageHeader FlexRow FlexSplit'}>
            <Svg className={'SVG IconLogoWithText Clickable'} svg={ SvgAuraPoolLogo } onClick = { onClickLogo } />
            <div className={'StartRightBlock FlexRow'}>
                <div className={`B1 SemiBold Clickable ${S.CSS.getActiveClassName(isLocationMarketplace())}`} onClick={() => navigate(AppRoutes.MARKETPLACE)}>Marketplace</div>
                <div className={`B1 SemiBold Clickable ${S.CSS.getActiveClassName(location.pathname === AppRoutes.REWARDS_CALCULATOR)}`} onClick={() => navigate(AppRoutes.REWARDS_CALCULATOR)}>Rewards Calculator</div>

                {walletStore.isConnected()
                    ? <>
                        <div className={`B1 SemiBold Clickable ${S.CSS.getActiveClassName(location.pathname === AppRoutes.USER_PROFILE)}`} onClick={onClickAddress}>Profile</div>
                        <div className={'VerticalSeparator'} />
                        <div className={'FlexRow BalanceRow B2'}>
                            <Svg svg={AccountBalanceWalletIcon} />
                            <div className={'SemiBold Gray'}>Balance:</div>
                            <div className={'Bold'}>{walletStore.getBalance()} CUDOS</div>
                        </div>
                        <div className={'FlexRow AddressRow'}>
                            <div className={'Bold'}>{ProjectUtils.shortenAddressString(walletStore.address, 20)}</div>
                            <Svg className={'Clickable'} onClick={onClickAddressMenu} svg={MoreVertIcon} />
                        </div>

                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <div className={'PageHeaderAddressPopover FlexColumn'}>
                                <div className={'Address B2'}>{ProjectUtils.shortenAddressString(walletStore.address, 20)}</div>
                                <div className={'ButtonRow FlexRow'}>
                                    <Svg className={'Clickable'} svg={FileCopyIcon} onClick={onClickCopyAddress}/>
                                    <a href={`${CHAIN_DETAILS.EXPLORER_URL[walletStore.selectedNetwork]}/accounts/${walletStore.address}`} target={'_blank'} rel="noreferrer"><Svg svg={LaunchIcon} /></a>
                                </div>
                                <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_CENTER} height={ACTIONS_HEIGHT.HEIGHT_48}>
                                    <Button radius={BUTTON_RADIUS.RADIUS_16} onClick={onClickDisconnect}>Disconnect</Button>
                                </Actions>
                            </div>
                        </Popover>
                    </>
                    : <>
                        <Actions height={ACTIONS_HEIGHT.HEIGHT_48}>
                            <Button onClick={onClickLogin}>Connect Wallet</Button>
                        </Actions>
                    </>
                }
            </div>
        </footer>
    )
}

export default inject((stores) => stores)(observer(PageHeader));
