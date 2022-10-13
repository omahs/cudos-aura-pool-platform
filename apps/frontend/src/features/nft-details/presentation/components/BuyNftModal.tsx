import React from 'react';
import { inject, observer } from 'mobx-react';

import ModalWindow from '../../../../core/presentation/components/ModalWindow';
import BuyNftModalStore from '../stores/BuyNftModalStore';
import Input, { InputType } from '../../../../core/presentation/components/Input';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button from '../../../../core/presentation/components/Button';
import CudosRepo from '../../../cudos-data/presentation/repos/CudosRepo';

type Props = {
    buyNftModalStore?: BuyNftModalStore;
}

function BuyNftModal({ buyNftModalStore }: Props) {
    const nft = buyNftModalStore.nft;

    function onClickPurchase() {
        // TODO: send message and wait for successfull TX

    }

    return (
        <ModalWindow
            modalStore = { buyNftModalStore } >
            {nft ? <div className={'BuyNftPopup FlexColumn'}>
                <div className={'Heading3'}>Buy NFT</div>
                <div className={'PaddingContainer FlexRow'}>
                    <div className={'NftPicture'}></div>
                    <div className={'NftInfo FlexRow'}>
                        <div className={'CollectionName B2'}></div>
                        <div className={'NftName Heading2'}>{nft.name}</div>
                        <div className={'Price FlexRow'}>
                            <div className={'Heading3'}>{nft.price.toFixed(0)} CUDOS</div>
                            <div className={'B2'}>${nft.price.multipliedBy(buyNftModalStore.cudosPrice).toFixed(0)}</div>
                        </div>
                    </div>
                </div>
                <div className={'B3'}>Set Rewards Recepient Address</div>
                <Input inputType={InputType.TEXT}
                    value={buyNftModalStore.recipient}
                    onChange={buyNftModalStore.setRecipient}
                />
                <Actions height={ACTIONS_HEIGHT.HEIGHT_48} layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL}>
                    <Button onClick={onClickPurchase}>Complete Purchase</Button>
                </Actions>
            </div> : ''}
        </ModalWindow>
    )

}

export default inject((stores) => stores)(observer(BuyNftModal));
