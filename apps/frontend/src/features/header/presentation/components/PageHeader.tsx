import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import S from '../../../../../src/core/utilities/Main';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import WalletStore from '../../../ledger/presentation/stores/WalletStore';
import ProjectUtils from '../../../../core/utilities/ProjectUtils';
import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import RepoStore from '../../../../core/presentation/stores/RepoStore';

import Svg from '../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import Popover from '../../../../core/presentation/components/Popover';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import SvgAuraPoolLogo from '../../../../public/assets/vectors/aura-pool-logo.svg';
import '../styles/page-header.css'

type Props = {
    accountSessionStore?: AccountSessionStore,
    walletStore?: WalletStore,
}

function PageHeader({ accountSessionStore, walletStore }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    function onClickAddress() {
        navigate(AppRoutes.USER_PROFILE);
    }

    function onClickLogo() {
        navigate(AppRoutes.HOME);
    }

    function onClickMarketplace() {
        navigate(AppRoutes.MARKETPLACE);
    }

    function onClickRewardsCalculator() {
        navigate(AppRoutes.REWARDS_CALCULATOR);
    }

    function onClickAddressMenu(event) {
        setAnchorEl(event.target.parentNode.parentNode);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function onClickCopyAddress() {
        ProjectUtils.copyText(walletStore.getAddress())
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

    return (
        <header className={'PageHeader FlexRow FlexSplit'}>
            <div className={'LogoHeader FlexRow'}>
                <Svg className={'SVG IconLogoWithText Clickable'} svg={ SvgAuraPoolLogo } onClick = { onClickLogo } />
            </div>

            <div className={'StartRightBlock FlexRow'}>
                <div className={`B1 SemiBold Clickable ${S.CSS.getActiveClassName(location.pathname === AppRoutes.MARKETPLACE)}`} onClick={onClickMarketplace}>Marketplace</div>
                <div className={`B1 SemiBold Clickable ${S.CSS.getActiveClassName(location.pathname === AppRoutes.REWARDS_CALCULATOR)}`} onClick={onClickRewardsCalculator}>Rewards Calculator</div>

                { accountSessionStore.isUser() === true && (
                    <div
                        className={`B1 SemiBold Clickable ${S.CSS.getActiveClassName(location.pathname === AppRoutes.USER_PROFILE)}`}
                        onClick={onClickAddress}>
                            Profile
                    </div>
                ) }

                {walletStore.isConnected()
                    ? <>
                        <div className={'VerticalSeparator'} />
                        <div className={'FlexRow BalanceRow B2'}>
                            <Svg svg={AccountBalanceWalletIcon} />
                            <div className={'SemiBold Gray'}>Balance:</div>
                            <div className={'Bold'}>{walletStore.getBalance()} CUDOS</div>
                        </div>
                        <div className={'FlexRow AddressRow'}>
                            <div className={'Bold'}>{ProjectUtils.shortenAddressString(walletStore.getAddress(), 20)}</div>
                            <Svg className={'Clickable'} onClick={onClickAddressMenu} svg={MoreVertIcon} />
                        </div>

                        <Popover
                            open={anchorEl !== null}
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
                                <div className={'Address B2'}>{ProjectUtils.shortenAddressString(walletStore.getAddress(), 20)}</div>
                                <div className={'ButtonRow FlexRow'}>
                                    <Svg className={'Clickable'} svg={FileCopyIcon} onClick={onClickCopyAddress}/>
                                    <a href={`${CHAIN_DETAILS.EXPLORER_URL[walletStore.selectedNetwork]}/accounts/${walletStore.getAddress()}`} target={'_blank'} rel="noreferrer"><Svg svg={LaunchIcon} /></a>
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
        </header>
    )
}

export default inject((stores) => stores)(observer(PageHeader));
