import Svg, { SvgSize } from '../../../../../core/presentation/components/Svg';
import { inject, observer } from 'mobx-react';
import React from 'react';
import CreditCollectionStore from '../../stores/CreditCollectionStore';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import '../../styles/collection-credit-side-preview.css';
import S from '../../../../../core/utilities/Main';

export enum CollectionCreditSidePreviewSize {
    SMALL = 1,
    FULL = 2,
}

type Props = {
    size: CollectionCreditSidePreviewSize,
    creditCollectionStore?: CreditCollectionStore;
}

function CollectionCreditSidePreview({ size, creditCollectionStore }: Props) {
    const collectionEntity = creditCollectionStore.collectionEntity;

    return (
        <div className={'CollectionCreditSidePreview FlexColumn'}>
            <div className={'H3 Bold'}>Collection Preview</div>
            <div className={'B1'}>This is how your collection details view would look like in AuraPool</div>
            <div className={'PreviewBorderContainer FlexColumn'}>
                <div className={`CoverPicture ImgCoverNode ${S.CSS.getClassName(creditCollectionStore.isCoverPictureEmpty(), 'Empty')}`}
                    style={{
                        backgroundImage: `url("${collectionEntity.coverImgUrl}")`,
                    }} >
                    {creditCollectionStore.isProfilePictureEmpty() === true && (
                        <div className={'EmptyPictureSvg'}>
                            <Svg svg={InsertPhotoIcon} size={SvgSize.CUSTOM}/>
                        </div>
                    )}
                    <div className={`ProfilePicture ImgCoverNode ${S.CSS.getClassName(creditCollectionStore.isProfilePictureEmpty(), 'Empty')}`}
                        style={{
                            backgroundImage: `url("${collectionEntity.profileImgUrl}")`,
                        }} >
                        {creditCollectionStore.isProfilePictureEmpty() === true && (
                            <div className={'EmptyPictureSvg'}>
                                <Svg svg={InsertPhotoIcon} size={SvgSize.CUSTOM}/>
                            </div>
                        )}
                    </div>
                </div>
                <div className={'H3 Bold'}>{collectionEntity.name || 'No Name'}</div>
                <div className={'B3'}>{collectionEntity.description || 'No Description'}</div>
            </div>
        </div>
    )

}

CollectionCreditSidePreview.defaultProps = {
    size: CollectionCreditSidePreviewSize.FULL,
};

export default inject((stores) => stores)(observer(CollectionCreditSidePreview));
