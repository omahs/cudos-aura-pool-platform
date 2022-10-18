import React, { useState } from 'react';

import '../../styles/step-review.css';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_RADIUS, BUTTON_TYPE } from '../../../../../core/presentation/components/Button';
import AdminEntity from '../../../entities/AdminEntity';
import MiningFarmEntity from '../../../../mining-farm/entities/MiningFarmEntity';
import ManufacturerEntity from '../../../../mining-farm/entities/ManufacturerEntity';
import MinerEntity from '../../../../mining-farm/entities/MinerEntity';
import EnergySourceEntity from '../../../../mining-farm/entities/EnergySourceEntity';
import { inject, observer } from 'mobx-react';
import ImageEntity from '../../../../upload-file/entities/ImageEntity';
import Checkbox from '../../../../../core/presentation/components/Checkbox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Svg from '../../../../../core/presentation/components/Svg';

type Props = {
    adminEntity: AdminEntity
    miningFarmEntity: MiningFarmEntity
    imageEntities: ImageEntity[]
    onClickContinue: () => void
    onClickBack: () => void
}

function StepReview({ adminEntity, miningFarmEntity, imageEntities, onClickContinue, onClickBack }: Props) {
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    return (
        <>
            <div className={'H3 Bold FullLine'}>{miningFarmEntity.name}</div>
            <div className={'B3 FullLine Descripton'}>{miningFarmEntity.description}</div>
            <div className={'ReviewDataContainer FlexColumn B2 SemiBold'}>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Account Email</div>
                    <div className={'DataValue'}>{adminEntity.email}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Legal Entity Name</div>
                    <div className={'DataValue'}>{miningFarmEntity.legalName}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Primary Account Owner</div>
                    <div className={'DataValue'}>{miningFarmEntity.primaryAccountOwnerName}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Primary Account Owner Email</div>
                    <div className={'DataValue'}>{miningFarmEntity.primaryAccountOwnerEmail}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Manufacturers</div>
                    <div className={'DataValue'}>{miningFarmEntity.manufacturerIds.map((id) => ManufacturerEntity.getManufacturerName(id)).join(', ')}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Miners</div>
                    <div className={'DataValue'}>{miningFarmEntity.minerIds.map((id) => MinerEntity.getMinerName(id)).join(', ')}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Energy Source</div>
                    <div className={'DataValue'}>{miningFarmEntity.energySourceIds.map((id) => EnergySourceEntity.getEnergySourceName(id)).join(', ')}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Machines Location</div>
                    <div className={'DataValue'}>{miningFarmEntity.machinesLocation}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Hashrate</div>
                    <div className={'DataValue'}>{miningFarmEntity.displayHashRate()}</div>
                </div>
                <div className={'FlexRow DataRow'}>
                    <div className={'DataLabel'}>Farm Photos</div>
                    <div className={'DataValue'}>{imageEntities.length}</div>
                </div>
            </div>
            <div className={'TermsAgreeRow'}>
                <Checkbox
                    label={'I agree to allow Aura Pool to store and process the personal information submitted above to provide me the service requested.'}
                    value={acceptedTerms}
                    onChange={setAcceptedTerms}
                />
            </div>
            <Actions className={'ButtonRow'} layout={ACTIONS_LAYOUT.LAYOUT_ROW_ENDS} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickBack}
                    type={BUTTON_TYPE.TEXT_INLINE}
                >
                    <Svg svg={ArrowBackIcon} />
                    Back
                </Button>
                <Button
                    disabled={!acceptedTerms}
                    onClick={onClickContinue}
                    radius={BUTTON_RADIUS.RADIUS_16}
                    padding={BUTTON_PADDING.PADDING_48}
                >Finish</Button>
            </Actions>
        </>
    )
}

export default inject((props) => props)(observer(StepReview));
