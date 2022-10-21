import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../../../core/utilities/Main';
import BuyNftModalStore from '../stores/BuyNftModalStore';
import ResellNftModalStore from '../stores/ResellNftModalStore';

import ModalWindow from '../../../../core/presentation/components/ModalWindow';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button from '../../../../core/presentation/components/Button';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';
import AnimationContainer from '../../../../core/presentation/components/AnimationContainer';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LaunchIcon from '@mui/icons-material/Launch';
import '../styles/buy-nft-modal.css';

type Props = {
    resellNftModalStore?: ResellNftModalStore;
    buyNftModalStore?: BuyNftModalStore;
}

function BuyNftModal({ resellNftModalStore, buyNftModalStore }: Props) {
    const nftEntity = buyNftModalStore.nftEntity;

    function onClickResellNft() {
        resellNftModalStore.showSignal(buyNftModalStore.nftEntity, buyNftModalStore.cudosPrice, buyNftModalStore.collectionName);
        buyNftModalStore.hide();
    }

    return (
        <ModalWindow
            className = { 'BuyNftPopup' }
            modalStore = { buyNftModalStore } >

            <AnimationContainer className = { 'Stage Preview FlexColumn' } active = { buyNftModalStore.isStagePreview() } >

                {buyNftModalStore.isStagePreview() && (
                    <>
                        <div className={'H3 Bold'}>Buy NFT</div>
                        <div className={'BorderContainer FlexRow'}>
                            <div
                                className={'NftPicture'}
                                style={{
                                    backgroundImage: `url("${nftEntity.imageUrl}")`,
                                }}
                            />
                            <div className={'NftInfo FlexColumnt'}>
                                <div className={'CollectionName B2 SemiBold Gray'}>{buyNftModalStore.collectionName}</div>
                                <div className={'NftName H2 Bold'}>{nftEntity.name}</div>
                                <div className={'Price FlexRow'}>
                                    <div className={'H3 Bold'}>{nftEntity.price.toFixed(0)} CUDOS</div>
                                    <div className={'B2 SemiBold Gray'}>${nftEntity.price.multipliedBy(buyNftModalStore.cudosPrice).toFixed(0)}</div>
                                </div>
                            </div>
                        </div>
                        <Input inputType={InputType.TEXT}
                            value={buyNftModalStore.recipient}
                            onChange={buyNftModalStore.setRecipient}
                            label={'Set Rewards Recepient Address'}
                            placeholder={'e.g bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'} />
                        <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL}>
                            <Button onClick={buyNftModalStore.buyNft}>Complete Purchase</Button>
                        </Actions>
                    </>
                ) }

            </AnimationContainer>

            <AnimationContainer className = { 'Stage Processing FlexColumn' } active = { buyNftModalStore.isStageProcessing() } >

                { buyNftModalStore.isStageProcessing() && (
                    <>
                        <div className={'H2 Bold'}>Processing...</div>
                        <div className={'Info'}>
                            <div className={'H3'}>Check your wallet for detailed information.</div>
                            <div className={'H3'}>Sign the transaction.</div>
                        </div>
                    </>
                ) }

            </AnimationContainer>

            <AnimationContainer className = { 'Stage Success FlexColumn' } active = { buyNftModalStore.isStageSuccess() } >

                { buyNftModalStore.isStageSuccess() && (
                    <>
                        <Svg className={'SuccessSvg'} svg={CheckCircleIcon} size={SvgSize.CUSTOM}/>
                        <div className={'H2 Bold'}>Success!</div>
                        <div className={'H3'}>Transaction was successfully executed.</div>
                        <div className={'BorderContainer FlexColumn'}>
                            <div
                                className={'NftPicture'}
                                style={{
                                    backgroundImage: `url("${nftEntity.imageUrl}")`,
                                }} />
                            <div className={'B2 SemiBold Gray'}>{buyNftModalStore.collectionName}</div>
                            <div className={'H2 Bold'}>{nftEntity.name}</div>
                        </div>
                        <div className={'FlexRow TransactionView H3'}>
                            Transaction details
                            <a className={'Clickable'} href={buyNftModalStore.getTxLink()} target={'_blank'} rel={'noreferrer'}>
                                <Svg svg={LaunchIcon} />
                            </a>
                        </div>
                        <Actions layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER} height={ACTIONS_HEIGHT.HEIGHT_48}>
                            <Button onClick={onClickResellNft}>
                                Resell NFT
                            </Button>
                            <Button onClick={buyNftModalStore.hide}>
                                View Item
                            </Button>
                        </Actions>
                    </>
                ) }

            </AnimationContainer>

        </ModalWindow>
    )

}

export default inject((stores) => stores)(observer(BuyNftModal));
