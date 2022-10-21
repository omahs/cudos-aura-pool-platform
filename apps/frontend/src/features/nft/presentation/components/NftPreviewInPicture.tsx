import React from 'react';
import NftEntity from '../../entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import '../styles/nft-preview-inv-pricture.css';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

type Props = {
    nftEntity: NftEntity
    collectionEntity: CollectionEntity
}

export default function NftPreviewInPicture({ nftEntity, collectionEntity }: Props) {
    const navigate = useNavigate();

    const onClickNft = () => {
        navigate(`${AppRoutes.VIEW_NFT}/${nftEntity.id}`);
    }

    return (
        <div className='NftPreviewInPicture Clickable' onClick={onClickNft}>
            <div
                className={'NftImage'}
                style={{
                    backgroundImage: `url("${nftEntity.imageUrl}")`,

                }}
            >
                <div className={'TextHolder'}>
                    <div className={'H2 Bold'}>{nftEntity.name}</div>
                    <div className={'B2'}>{collectionEntity.name}</div>
                </div>
            </div>
        </div>
    )
}
