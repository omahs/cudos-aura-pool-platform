import Svg from '../../../../core/presentation/components/Svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgCudosLogo from '../../../../public/assets/vectors/cudos-logo.svg';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import CollectionPreviewEntity from '../../../collections-marketplace/entities/CollectionPreviewEntity';
import '../styles/collection-preview.css';

interface Props {
    collectionPreviewModel: CollectionPreviewEntity,
}

export default function CollectionPreview({ collectionPreviewModel }: Props) {
    const navigate = useNavigate();

    const onClickNft = () => {
        navigate(`${AppRoutes.COLLECTION_VIEW}/${collectionPreviewModel.id}`);
    }

    return (
        <div className="CollectionPreview FlexColumn" onClick={onClickNft}>
            <div
                className="CollectionPreviewImage"
                style={{
                    backgroundImage: `url("${collectionPreviewModel.profileImgurl}")`,
                }}
            ></div>
            <div className={'CollectionName B2'}>{collectionPreviewModel.name}</div>
            <div className={'CollectionName H2 Bold'}>{collectionPreviewModel.name}</div>
            <div className={'HashPower H4 Medium'}>{collectionPreviewModel.hashPower}</div>
            <div className={'Priceheading B2 SemiBold'}>Price</div>
            <div className={'PriceRow FlexRow'}>
                <Svg svg={SvgCudosLogo}/>
                <div className={'Price H4 Bold'}>{collectionPreviewModel.price.toFixed(0)} CUDOS</div>
            </div>
        </div>
    );
}
