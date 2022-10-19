import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import CollectionEntity from '../../entities/CollectionEntity';
import '../styles/collection-preview.css';

type Props = {
    collectionEntity: CollectionEntity,
    miningFarmName: string
}

export default function CollectionPreview({ collectionEntity, miningFarmName }: Props) {

    const navigate = useNavigate();

    const onClickNft = () => {
        navigate(`${AppRoutes.COLLECTION_VIEW}/${collectionEntity.id}`);
    }

    return (
        <div className="CollectionPreview FlexColumn" onClick={onClickNft}>
            <div
                className="CollectionPreviewImage"
                style={{
                    backgroundImage: `url("${collectionEntity.profileImgUrl}")`,
                }} />
            <div className={'MiningFarmName B2'}>{miningFarmName}</div>
            <div className={'CollectionName H2 Bold'}>{collectionEntity.name}</div>
            <div className={'HashPower H4 Medium'}>{collectionEntity.hashPower}</div>
        </div>
    );
}
