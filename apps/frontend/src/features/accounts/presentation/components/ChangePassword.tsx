import React, { useEffect, useRef, useState } from 'react';

import '../styles/change-password.css';
import { inject, observer } from 'mobx-react';
import Input from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import Svg from '../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import AccountSessionStore from '../stores/AccountSessionStore';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';

type Props = {
    accountSessionStore?: AccountSessionStore;
    appStore?: AppStore;
    repoStore?: RepoStore;
}

function ChangePassword({ appStore, accountSessionStore, repoStore }: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [showPasswordRepeat, setshowPasswordRepeat] = useState(false);
    const [logging, setLogging] = useState(false);

    const selfRef = useRef({
        miningFarmEntity: null,
    })

    useEffect(() => {
        appStore.useLoading(async () => {
            selfRef.current.miningFarmEntity = await repoStore.miningFarmRepo.fetchMiningFarmBySessionAccountId();
            if (selfRef.current.miningFarmEntity == null) {
                selfRef.current.miningFarmEntity = new MiningFarmEntity();
            }
        });
    }, []);

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function onClickShowPasswordRepeat() {
        setshowPasswordRepeat(!showPasswordRepeat);
    }

    async function onClickLogin() {
        setLogging(true);
        await accountSessionStore.changePassword(password, passwordRepeat);
        // setLogging(false);
    }

    if (selfRef.current.miningFarmEntity === null) {
        return '';
    }

    return (
        <div className={'ChangePasswordForm FlexColumn'}>
            <div className={'H2 Bold'}>Welcome, {selfRef.current.miningFarmEntity.name}</div>
            <div className={'B1 SubHeading'}><b>First</b> thing to do: <b>Change</b> to your prefered password</div>

            <Input
                label={'New Password'}
                placeholder={'Password'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg className={'Clickable'} svg={showPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPassword}/>
                    </InputAdornment>,
                }}
                value={password}
                onChange={setPassword}
                type={showPassword === false ? 'password' : ''}
            />

            <Input
                label={'Confirm Password'}
                placeholder={'Confirm Password'}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg className={'Clickable'} svg={showPasswordRepeat === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPasswordRepeat}/>
                    </InputAdornment>,
                }}
                value={passwordRepeat}
                onChange={setPasswordRepeat}
                type={showPasswordRepeat === false ? 'password' : ''}
            />
            <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickLogin}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >
                    {logging === true ? <LoadingIndicator /> : 'Access your account'}
                </Button>
            </Actions>
        </div>
    )
}

export default inject((stores) => stores)(observer(ChangePassword));
