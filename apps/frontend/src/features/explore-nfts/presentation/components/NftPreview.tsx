import React from 'react';
import SvgCudosLogo from '../../../../public/assets/vectors/cudos-logo.svg';
import NftPreviewModel from '../../entities/NftPreviewModel';
import '../styles/nft-preview.css';

interface Props {
    nftPreviewModel: NftPreviewModel,
}

export default function NftPreview(props: Props) {
    const nftModel = props.nftPreviewModel;

    return (
        <div className="NftPreview FlexColumn">
            <div
                className="NftPreviewImage"
                style={{
                    backgroundImage: `url("${nftModel.imageUrl}")`,
                }}
            ></div>
            <div className={'CollectionName'}>{nftModel.collectionName}</div>
            <div className={'NftName'}>{nftModel.name}</div>
            <div className={'HashPower'}>{nftModel.hashPower}</div>
            <div className={'Priceheading'}>Price</div>
            <div className={'PriceRow FlexRow'}>
                <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgCudosLogo }}/>
                <div className={'Price'}>{nftModel.price.toFixed(0)} CUDOS</div>
            </div>
        </div>
    );
}
