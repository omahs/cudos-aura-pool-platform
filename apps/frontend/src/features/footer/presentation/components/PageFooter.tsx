import Svg from '../../../../core/presentation/components/Svg';
import SvgCudosLogoWithText from '../../../../public/assets/vectors/cudos-logo-with-text.svg'
import SvgLinkedin from '../../../../public/assets/vectors/linkedin.svg';
import SvgTwitter from '../../../../public/assets/vectors/twitter.svg';
import SvgFacebook from '../../../../public/assets/vectors/facebook.svg';
import SvgMedium from '../../../../public/assets/vectors/medium.svg';
import SvgTelegram from '../../../../public/assets/vectors/telegram.svg';
import SvgDiscord from '../../../../public/assets/vectors/discord.svg';
import SvgSpotify from '../../../../public/assets/vectors/spotify.svg';
import SvgYoutube from '../../../../public/assets/vectors/youtube.svg';
import { TERMS_AND_CONDITIONS, PRIVACY_POLICY, WEBSITE, TELEGRAM, LINKEDIN, TWITTER, DISCORD, FACEBOOK, MEDIUM, SPOTIFY, YOUTUBE } from '../../../../core/utilities/Links';

import React from 'react'
import '../styles/page-footer.css'

export default function PageFooter() {
    return (
        <footer className={'PageFooter FlexRow FlexSplit'}>
            <Svg className={'SVG IconLogoWithText'} svg={SvgCudosLogoWithText} />
            <div className={'FooterNav FlexRow'} >
                <a href={TERMS_AND_CONDITIONS} >Terms &amp; Conditions</a>
                <a href={PRIVACY_POLICY} >Privacy Policy</a>
                <a href={WEBSITE} target={'_blank'} rel={'noreferrer'} >Cudos.org</a>
                <a>License &copy; 2018 - {new Date().getFullYear()}</a>
            </div>
            <div className={'StartRightBlock'}>
                <a href={LINKEDIN} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgLinkedin } /></a>
                <a href={TWITTER} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgTwitter } /></a>
                <a href={FACEBOOK} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgFacebook } /></a>
                <a href={MEDIUM} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgMedium } /></a>
                <a href={TELEGRAM} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgTelegram } /></a>
                <a href={DISCORD} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgDiscord } /></a>
                <a href={SPOTIFY} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgSpotify } /></a>
                <a href={YOUTUBE} className={'IconSocial'} target={'_blank'} rel={'noreferrer'} ><Svg svg={ SvgYoutube } /></a>
            </div>
        </footer>
    )
}
