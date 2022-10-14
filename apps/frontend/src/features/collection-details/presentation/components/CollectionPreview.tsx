import Svg from '../../../../core/presentation/components/Svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgCudosLogo from '../../../../public/assets/vectors/cudos-logo.svg';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import CollectionEntity from '../../../collections-marketplace/entities/CollectionEntity';
import '../styles/collection-preview.css';

interface Props {
    collectionEntity: CollectionEntity,
}

export default function CollectionPreview({ collectionEntity }: Props) {
    const navigate = useNavigate();

    const onClickNft = () => {
        navigate(`${AppRoutes.COLLECTION_VIEW}/${collectionEntity.id}`);
    }

    return (
        <div className="CollectionPreview FlexColumn" onClick={onClickNft}>
            <div
                className="CollectionPreviewImage"
                style={{
                    backgroundImage: `url("${collectionEntity.profileImgurl}")`,
                }}
            ></div>
            <div className={'CollectionName B2'}>{collectionEntity.name}</div>
            <div className={'CollectionName H2 Bold'}>{collectionEntity.name}</div>
            <div className={'HashPower H4 Medium'}>{collectionEntity.hashPower}</div>
            <div className={'Priceheading B2 SemiBold'}>Price</div>
            <div className={'PriceRow FlexRow'}>
                <Svg svg={SvgCudosLogo}/>
                <div className={'Price H4 Bold'}>{collectionEntity.price.toFixed(0)} CUDOS</div>
            </div>
        </div>
    );
}
