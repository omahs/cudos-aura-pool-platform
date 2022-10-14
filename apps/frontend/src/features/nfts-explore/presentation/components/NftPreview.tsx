import Svg from '../../../../core/presentation/components/Svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgCudosLogo from '../../../../public/assets/vectors/cudos-logo.svg';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import '../styles/nft-preview.css';
import NftEntity from '../../../nft-details/entities/NftEntity';
import CollectionProfileEntity from '../../../collections-marketplace/entities/CollectionProfileEntity';

interface Props {
    nftEntity: NftEntity,
    collectionEntity: CollectionProfileEntity
}

export default function NftPreview({ nftEntity, collectionEntity }: Props) {
    const navigate = useNavigate();

    const onClickNft = () => {
        navigate(`${AppRoutes.NFT_VIEW}/${nftEntity.id}`);
    }

    return (
        <div className="NftPreview FlexColumn" onClick={onClickNft}>
            <div
                className="NftPreviewImage"
                style={{
                    backgroundImage: `url("${nftEntity.imageUrl}")`,
                }}
            ></div>
            <div className={'CollectionName B2'}>{collectionEntity.name}</div>
            <div className={'NftName H2 Bold'}>{nftEntity.name}</div>
            <div className={'HashPower H4 Medium'}>{nftEntity.hashPower}</div>
            <div className={'Priceheading B2 SemiBold'}>Price</div>
            <div className={'PriceRow FlexRow'}>
                <Svg svg={SvgCudosLogo}/>
                <div className={'Price H4 Bold'}>{nftEntity.price.toFixed(0)} CUDOS</div>
            </div>
        </div>
    );
}
