import React from 'react';
import NftEntity from '../../../nft/entities/NftEntity';
import CollectionEntity from '../../entities/CollectionEntity';

interface Props {
    nftEntity: NftEntity
    collectionEntity: CollectionEntity
}

export default function NftPreviewInPicture({ nftEntity, collectionEntity }: Props) {
    return (
        <div
            className={'NftPreviewInPicture FlexColumn'}
            style={{
                backgroundImage: `url("${nftEntity.imageUrl}")`,

            }}
        >
            <div className={'H2 Bold'}>{nftEntity.name}</div>
            <div className={'B2'}>{collectionEntity.name}</div>
        </div>
    )
}
