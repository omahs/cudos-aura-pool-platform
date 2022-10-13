import React from 'react';
import { inject, observer } from 'mobx-react';

import ModalWindow from '../../../../core/presentation/components/ModalWindow';
import ResellNftModalStore, { ModalStage } from '../stores/ResellNftModalStore';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '../../../../core/presentation/components/Checkbox';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import ReportIcon from '@mui/icons-material/Report';

import '../styles/resell-nft-modal.css';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';

type Props = {
    resellNftModalStore?: ResellNftModalStore;
}

function ResellNftModal({ resellNftModalStore }: Props) {
    const nft = resellNftModalStore.nft;

    return (
        <ModalWindow modalStore = { resellNftModalStore } >
            <div className={'ResellNftPopup FlexColumn'}>
                {resellNftModalStore.isStagePreview() ? <PreviewContent /> : ''}
                {resellNftModalStore.isStageProcessing() ? <ProcessingContent /> : ''}
                {resellNftModalStore.isStageSuccess() ? <SuccessContent /> : ''}
                {resellNftModalStore.isStageFail() ? <FailContent /> : ''}
            </div>
        </ModalWindow>
    )

    function PreviewContent() {
        return (
            <>
                <div className={'H3 Bold'}>Resell NFT</div>
                <div className={'BorderContainer FlexRow'}>
                    <div
                        className={'NftPicture'}
                        style={{
                            backgroundImage: `url("${nft.imageUrl}")`,
                        }}
                    />
                    <div className={'NftInfo FlexColumnt'}>
                        <div className={'CollectionName B2 SemiBold Gray'}>{resellNftModalStore.collectionName}</div>
                        <div className={'NftName H2 Bold'}>{nft.name}</div>
                        <div className={'Address FlexColumn'}>
                            <div className={'B2 SemiBold Gray'}>Current Rewards Recipient</div>
                            <div className={'H3 Bold'}>{nft.currentOwnerAddress}</div>
                        </div>
                    </div>
                </div>
                <Input inputType={InputType.REAL}
                    value={resellNftModalStore.priceDisplay}
                    onChange={resellNftModalStore.setPrice}
                    label={'Set NFT Price'}
                    placeholder={'0'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end" >
                    CUDOS
                        </InputAdornment>,
                    }}
                />
                <div className={'CheckBoxText B2 SemiBold'}>Do you want to have immediate auto pay on sale or disperse as per the original payment schedule?</div>
                <div className={'FlexRow CheckBoxRow'}>
                    <Checkbox
                        label={'Auto pay'}
                        value={resellNftModalStore.autoPay}
                        onChange={resellNftModalStore.toggleAutoPay}
                    />
                    <Checkbox
                        label={'Original Payment Schedule'}
                        value={resellNftModalStore.originalPaymentSchedule}
                        onChange={resellNftModalStore.toggleOriginalPaymentSchedule}
                    />
                </div>
                <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL}>
                    <Button radius={BUTTON_RADIUS.DEFAULT} onClick={resellNftModalStore.onClickSubmitForSell}>Submit for sell</Button>
                </Actions>
            </>
        )
    }

    function ProcessingContent() {
        return (
            <div className={'Processing FlexColumn'}>
                <div className={'H2 Bold'}>Processing...</div>
                <div className={'H3'}>Check your wallet for detailed information.</div>
            </div>
        )
    }

    function SuccessContent() {
        return (
            <div className={'Success FlexColumn'}>
                <Svg className={'BigSvg'} svg={CheckCircleIcon} size={SvgSize.CUSTOM}/>
                <div className={'H2 Bold'}>Success!</div>
                <div className={'H3'}>Transaction was successfully executed.</div>
                <div className={'FlexRow TransactionView H3'}>
                            Transaction details

                    <a className={'Clickable'} href={resellNftModalStore.getTxLink()} target={'_blank'} rel={'noreferrer'}>
                        <Svg svg={LaunchIcon} />
                    </a>
                </div>
                <Actions layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER} height={ACTIONS_HEIGHT.HEIGHT_48}>
                    <Button
                        radius={BUTTON_RADIUS.DEFAULT}
                        onClick={resellNftModalStore.hide}
                    >Close Now</Button>
                </Actions>
            </div>
        )
    }

    function FailContent() {
        return (
            <div className={'Fail FlexColumn'}>
                <Svg className={'BigSvg'} svg={ReportIcon} size={SvgSize.CUSTOM}/>
                <div className={'H2 Bold'}>Error</div>
                <div className={'H3'}>Transaction was not successful. Check your network or token balance.</div>
                <div className={'FlexRow TransactionView H3'}>
                    Transaction details

                    <a className={'Clickable'} href={resellNftModalStore.getTxLink()} target={'_blank'} rel={'noreferrer'}>
                        <Svg svg={LaunchIcon} />
                    </a>
                </div>
                <Actions layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER} height={ACTIONS_HEIGHT.HEIGHT_48}>
                    <Button
                        radius={BUTTON_RADIUS.DEFAULT}
                        onClick={resellNftModalStore.hide}
                    >Close</Button>
                    <Button
                        radius={BUTTON_RADIUS.DEFAULT}
                        onClick={resellNftModalStore.onClickSubmitForSell}
                    >Try Again</Button>
                </Actions>
            </div>
        )
    }
}

export default inject((stores) => stores)(observer(ResellNftModal));
