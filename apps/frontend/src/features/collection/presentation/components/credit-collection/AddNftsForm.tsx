import { observer } from 'mobx-react';
import React from 'react';
import '../../styles/add-nfts-form.css';
import CreditCollectionStore from '../../stores/CreditCollectionStore';
import Svg, { SvgSize } from '../../../../../core/presentation/components/Svg';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Actions, { ActionsHeight, ActionsLayout } from '../../../../../core/presentation/components/Actions';
import Button, { ButtonRadius } from '../../../../../core/presentation/components/Button';
import UploaderComponent from '../../../../../core/presentation/components/UploaderComponent';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type Props = {
    onClickNextStep: () => void
    creditCollectionStore?: CreditCollectionStore;
}

function AddNftsForm({ onClickNextStep, creditCollectionStore }: Props) {
    const nftEntities = creditCollectionStore.nftEntities;
    const selectedNftEntity = creditCollectionStore.selectedNftEntity;

    return (
        <div className={'AddNftsForm FlexColumn'}>
            <div className={'H3 Bold'}>Add NFTs to Collection</div>
            <div className={'B1'}>Fill in the needed information for the NFTs.</div>
            <div className={'HorizontalSeparator'}></div>
            <div
                style={{
                    backgroundImage: `url("${selectedNftEntity.imageUrl}")`,
                }}
                className={`MainImagePreview ImagePreview FlexRow ${S.CSS.getClassName(creditCollectionStore.isSelectedNftImageEmpty(), 'Empty')}`}
            >
                {creditCollectionStore.isSelectedNftImageEmpty() === true && (
                    <div className={'EmptyPictureSvg'}>
                        <Svg svg={InsertPhotoIcon} size={SvgSize.CUSTOM}/>
                    </div>
                )}
            </div>
            <div className={'ImageLabel FlexColumn'}>
                <div className={'B2 Bold'}>Main Image</div>
                <div className={'B3 SemiBold'}>File Format: <span className={'Gray'}>.svg, .png, .jpeg, .gif</span></div>
            </div>
            <div className={'B1 SemiBold'}>600 x 400 recommended</div>
            <Actions layout={ActionsLayout.LAYOUT_ROW_LEFT} height={ActionsHeight.HEIGHT_48}>
                <Button
                    radius={ButtonRadius.RADIUS_16}
                >
                    <Svg svg={FileUploadIcon}/>
                        Upload file
                    <UploaderComponent
                        id = { this }
                        params = { {
                            'maxSize': 73400320, // 70MB
                            'onExceedLimit': () => {
                                this.props.alertStore.show('', 'Максималният размер на файловете е 70MB!');
                            },
                            'multi': true,
                            onReadFileAsBase64: (base64File, responseData, files: any[], i: number) => {
                                selectedNftEntity.imageUrl = base64File;
                            },
                        } } />
                </Button>
            </Actions>
        </div>
    )

}

export default (observer(AddNftsForm));
