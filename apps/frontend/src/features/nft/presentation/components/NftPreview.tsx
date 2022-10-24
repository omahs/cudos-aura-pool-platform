import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgCudosLogo from '../../../../public/assets/vectors/cudos-logo.svg';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import '../styles/nft-preview.css';
import NftEntity from '../../entities/NftEntity';
import { observer } from 'mobx-react-lite';
import S from '../../../../core/utilities/Main';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

type Props = {
    nftEntity: NftEntity,
    collectionName: string
    disabled?: boolean
}

function NftPreview({ nftEntity, collectionName, disabled }: Props) {
    const navigate = useNavigate();

    const onClickNft = () => {
        navigate(`${AppRoutes.VIEW_NFT}/${nftEntity.id}`);
    }

    const hasImage = nftEntity.imageUrl !== S.Strings.EMPTY;

    return (
        <div className={`NftPreview FlexColumn ${S.CSS.getClassName(disabled === false, 'Clickable')}`} onClick={disabled === false ? onClickNft : null}>
            <div
                className={`NftPreviewImage FlexRow ${S.CSS.getClassName(hasImage === false, 'Empty')}`}
                style={{
                    backgroundImage: `url("${nftEntity.imageUrl}")`,
                }}
            >
                {hasImage === false && <div className={'EmptyNftImageIcon'}>
                    <Svg svg={InsertPhotoIcon} size={SvgSize.CUSTOM}/>
                </div>}
            </div>
            <div className={'CollectionName B2'}>{collectionName}</div>
            <div className={'NftName H2 Bold'}>{nftEntity.name}</div>
            <div className={'HashPower H4 Medium'}>{nftEntity.getHashPowerDisplay()}</div>
            <div className={'Priceheading B2 SemiBold'}>Price</div>
            <div className={'PriceRow FlexRow'}>
                <Svg svg={SvgCudosLogo}/>
                <div className={'Price H4 Bold'}>{nftEntity.getPriceDisplay()}</div>
            </div>
        </div>
    );
}

NftPreview.defaultProps = {
    disabled: false,
}

export default observer(NftPreview);
