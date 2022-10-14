import React from 'react';
import NftEntity from '../../entities/NftEntity';
import CollectionEntity from '../../../collection/entities/CollectionEntity';
import '../styles/nft-preview-inv-pricture.css';

interface Props {
    nftEntity: NftEntity
    collectionEntity: CollectionEntity
}

export default function NftPreviewInPicture({ nftEntity, collectionEntity }: Props) {
    return (
        <div className='NftPreviewInPicture'>
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
