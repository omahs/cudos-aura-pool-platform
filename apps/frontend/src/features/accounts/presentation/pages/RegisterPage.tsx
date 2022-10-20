import React, { useState } from 'react';

import '../styles/page-register.css';
import { inject, observer } from 'mobx-react';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Svg from '../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountSessionStore from '../stores/AccountSessionStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import S from '../../../../core/utilities/Main';
import AlertStore from '../../../../core/presentation/stores/AlertStore';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import Box, { BoxWidth } from '../../../../core/presentation/components/Box';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

type Props = {
    alertStore?: AlertStore;
    accountSessionStore?: AccountSessionStore;
}

function RegisterPage({ alertStore, accountSessionStore }: Props) {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [registering, setRegistering] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    function onClickLogin() {
        navigate(AppRoutes.LOGIN);
    }

    function onClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function onClickShowRepeatPassword() {
        setShowRepeatPassword(!showRepeatPassword);
    }

    async function onClickRegister() {
        setRegistering(true);
        await accountSessionStore.register(email, password, fullname);
        // TO DO: redirect to farm details
        setRegistering(false);
    }

    return (
        <PageLayoutComponent className = { 'PageRegister' }>

            <PageHeader />

            <div className = { 'PageContent AppContent' } >

                <Box boxWidth = { BoxWidth.SMALL } >
                    <div className={'Title H2 Bold'}>Sign Up</div>
                    <div className={'Subtitle'}>Fill in your email, password and the required farm details in order to sign up</div>

                    <div className = { 'InputsCnt' } >
                        <Input
                            label={'Full Name'}
                            placeholder={'John Doe'}
                            value={email}
                            onChange={setEmail} />
                        <Input
                            label={'Email'}
                            placeholder={'exampleemail@mail.com'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <Svg svg={AlternateEmailIcon}/>
                                </InputAdornment>,
                            }}
                            value={email}
                            onChange={setEmail} />
                        <Input
                            label={'Password'}
                            placeholder={'***************'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <Svg className={'Clickable'} svg={showPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowPassword}/>
                                </InputAdornment>,
                            }}
                            value={password}
                            onChange={setPassword}
                            type={showPassword === false ? 'password' : 'text'} />
                        <Input
                            label={'Repeat Password'}
                            placeholder={'***************'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Svg className={'Clickable'} svg={showRepeatPassword === false ? VisibilityOffIcon : VisibilityIcon} onClick={onClickShowRepeatPassword}/>
                                </InputAdornment>,
                            }}
                            value={repeatPassword}
                            onChange={setRepeatPassword}
                            type={showRepeatPassword === false ? 'password' : 'text'} />
                    </div>

                    <Actions className = { 'RegisterActions' } layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                        <Button onClick={onClickRegister} >
                            {registering === true ? <LoadingIndicator /> : 'Register'}
                        </Button>
                    </Actions>

                    <div className={'BottomAction B2 Clickable'} onClick={onClickLogin}>
                        Already have an account? <span className = { 'Bold' }>Login</span>
                    </div>
                </Box>

            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(RegisterPage));
