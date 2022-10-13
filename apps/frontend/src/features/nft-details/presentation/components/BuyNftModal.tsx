import React from 'react';
import { inject, observer } from 'mobx-react';

import ModalWindow from '../../../../core/presentation/components/ModalWindow';
import BuyNftModalStore, { ModalStage } from '../stores/BuyNftModalStore';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../core/presentation/components/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/buy-nft-modal.css';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';
import LaunchIcon from '@mui/icons-material/Launch';

type Props = {
    resellNft: () => void;
    buyNftModalStore?: BuyNftModalStore;
}

function BuyNftModal({ resellNft, buyNftModalStore }: Props) {
    const nft = buyNftModalStore.nft;

    function onClickViewItem() {
        buyNftModalStore.hide();
    }

    function onClickResellNft() {
        buyNftModalStore.hide();
        resellNft();
    }

    return (
        <ModalWindow modalStore = { buyNftModalStore } >
            <div className={'BuyNftPopup FlexColumn'}>
                {buyNftModalStore.isStagePreview()
                    ? <>
                        <div className={'H3 Bold'}>Buy NFT</div>
                        <div className={'BorderContainer FlexRow'}>
                            <div
                                className={'NftPicture'}
                                style={{
                                    backgroundImage: `url("${nft.imageUrl}")`,
                                }}
                            />
                            <div className={'NftInfo FlexColumnt'}>
                                <div className={'CollectionName B2 SemiBold Gray'}>{buyNftModalStore.collectionName}</div>
                                <div className={'NftName H2 Bold'}>{nft.name}</div>
                                <div className={'Price FlexRow'}>
                                    <div className={'H3 Bold'}>{nft.price.toFixed(0)} CUDOS</div>
                                    <div className={'B2 SemiBold Gray'}>${nft.price.multipliedBy(buyNftModalStore.cudosPrice).toFixed(0)}</div>
                                </div>
                            </div>
                        </div>
                        <Input inputType={InputType.TEXT}
                            value={buyNftModalStore.recipient}
                            onChange={buyNftModalStore.setRecipient}
                            label={'Set Rewards Recepient Address'}
                            placeholder={'e.g bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
                        />
                        <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL}>
                            <Button radius={BUTTON_RADIUS.DEFAULT} onClick={buyNftModalStore.buyNft}>Complete Purchase</Button>
                        </Actions>
                    </> : ''}
                {buyNftModalStore.isStageProcessing()
                    ? <div className={'FlexColumn Processing'}>
                        <div className={'H2 Bold'}>Processing...</div>
                        <div className={'FlexColumn'}>
                            <div className={'H3'}>Check your wallet for detailed information.</div>
                            <div className={'H3'}>Sign the transaction.</div>
                        </div>
                    </div> : ''}

                {buyNftModalStore.isStageSuccess()
                    ? <div className={'FlexColumn Success'}>
                        <Svg className={'SuccessSvg'} svg={CheckCircleIcon} size={SvgSize.CUSTOM}/>
                        <div className={'H2 Bold'}>Success!</div>
                        <div className={'H3'}>Transaction was successfully executed.</div>
                        <div className={'BorderContainer FlexColumn'}>
                            <div
                                className={'NftPicture'}
                                style={{
                                    backgroundImage: `url("${nft.imageUrl}")`,
                                }}
                            />
                            <div className={'B2 SemiBold Gray'}>{buyNftModalStore.collectionName}</div>
                            <div className={'H2 Bold'}>{nft.name}</div>
                        </div>
                        <div className={'FlexRow TransactionView H3'}>
                            Transaction details

                            <a className={'Clickable'} href={buyNftModalStore.getTxLink()} target={'_blank'} rel={'noreferrer'}>
                                <Svg svg={LaunchIcon} />
                            </a>
                        </div>
                        <Actions layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER} height={ACTIONS_HEIGHT.HEIGHT_48}>
                            <Button
                                radius={BUTTON_RADIUS.DEFAULT}
                                onClick={onClickResellNft}
                            >Resell NFT</Button>
                            <Button
                                radius={BUTTON_RADIUS.DEFAULT}
                                onClick={onClickViewItem}
                            >View Item</Button>
                        </Actions>
                    </div> : ''}
            </div>

        </ModalWindow>
    )

}

export default inject((stores) => stores)(observer(BuyNftModal));
