import React, { useState } from 'react';

import '../../styles/request-admin-account.css';
import Input, { InputType } from '../../../../../core/presentation/components/Input';
import { InputAdornment } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Svg from '../../../../../core/presentation/components/Svg';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../../core/presentation/components/Actions';
import Button, { BUTTON_RADIUS } from '../../../../../core/presentation/components/Button';
import AdminEntity from '../../../entities/AdminEntity';
import MiningFarmEntity from 'apps/frontend/src/features/mining-farm/entities/MiningFarmEntity';
import Autocomplete from 'apps/frontend/src/core/presentation/components/Autcomplete';
import AutocompleteOption from 'apps/frontend/src/core/entities/AutocompleteOption';
import ManufacturerEntity from 'apps/frontend/src/features/mining-farm/entities/ManufacturerEntity';
import MinerEntity from 'apps/frontend/src/features/mining-farm/entities/MinerEntity';
import EnergySourceEntity from 'apps/frontend/src/features/mining-farm/entities/EnergySourceEntity';
import NearMeIcon from '@mui/icons-material/NearMe';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { observer } from 'mobx-react';

type Props = {
    adminEntity: AdminEntity
    miningFarmEntity: MiningFarmEntity
    onClickContinue: () => void
}

function StepFarmDetails({ adminEntity, miningFarmEntity, onClickContinue }: Props) {

    const [hashRateDisplay, setHashRateDisplay] = useState('');

    return (
        <>
            <div className={'H3 Bold Heading'}>Welcome to AuraPool</div>
            <div className={'B1'}>Follow the steps to create your Farm Profile</div>
            <div className={'B2'}>1. Fill in the general farm details</div>
            <Input
                label={'Farm Name'}
                placeholder={'e.g Cool Farm'}
                value={miningFarmEntity.name}
                onChange={(string) => { miningFarmEntity.name = string }}
                inputType={InputType.TEXT}
            />
            <Input
                label={'Description'}
                placeholder={'Enter description... (Optional)'}
                value={miningFarmEntity.description}
                onChange={(string) => { miningFarmEntity.description = string }}
                inputType={InputType.TEXT}
            />
            <Input
                label={'Legal Entity Name'}
                placeholder={'e.g Cool Farm Inc.'}
                value={miningFarmEntity.legalName}
                onChange={(string) => { miningFarmEntity.legalName = string }}
                inputType={InputType.TEXT}
            />
            <Input
                label={'Primary Account Owner Full Name'}
                placeholder={'e.g Steve Jones'}
                value={miningFarmEntity.primaryAccountOwnerName}
                onChange={(string) => { miningFarmEntity.primaryAccountOwnerName = string }}
                inputType={InputType.TEXT}
            />
            <Input
                label={'Primary Account Owner Email'}
                placeholder={'examplemail@mail.com'}
                value={miningFarmEntity.energySource}
                onChange={(string) => { miningFarmEntity.primaryAccountOwnerEmail = string }}
                inputType={InputType.TEXT}
            />;
            {/* <Autocomplete
                value = { miningFarmEntity.manufacturerId }
                multiple
                onChange = { (d) => {
                    miningFarmEntity.manufacturerId = d;
                }}
                placeholder={'Select manufacturers...'}
                options = { ManufacturerEntity.getAllManufacturers().map((manufacturer: ManufacturerEntity) => {
                    return new AutocompleteOption(manufacturer.id, manufacturer.name);
                })} />
            <Autocomplete
                value = { miningFarmEntity.minerId }
                onChange = { (d) => {
                    miningFarmEntity.minerId = d;
                }}
                placeholder={'Select miners...'}
                options = { MinerEntity.getAllMiners.map((miner: MinerEntity) => {
                    return new AutocompleteOption(miner.id, miner.name);
                })} />
            <Autocomplete
                value = { miningFarmEntity.energySourceId }
                onChange = { (d) => {
                    miningFarmEntity.energySourceId = d;
                }}
                placeholder={'Select energy source...'}
                options = { EnergySourceEntity.getAllEnergySources.map((energySource: EnergySourceEntity) => {
                    return new AutocompleteOption(energySource.id, energySource.name);
                })} /> */}
            <div className={'B2'}>2. Add farm activity details</div>
            <Input
                label={'Machines Location'}
                placeholder={'e.g Las Brisas, United States'}
                value={miningFarmEntity.machinesLocation}
                onChange={(string) => { miningFarmEntity.machinesLocation = string }}
                inputType={InputType.TEXT}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg svg={NearMeIcon}/>
                    </InputAdornment>,
                }}
            />
            <Input
                label={'Hashrate'}
                placeholder={'e.g 102.001 EH/s'}
                value={hashRateDisplay}
                onChange={(string) => {
                    setHashRateDisplay(string);
                    miningFarmEntity.parseHashRateFromString(string);
                }}
                inputType={InputType.TEXT}
                InputProps={{
                    endAdornment: <InputAdornment position="end" >
                        <Svg svg={NearMeIcon}/>
                    </InputAdornment>,
                }}
            />
            <div className={'FlexRow HashRateInfo B2 SemiBold'}>
                <Svg svg={ErrorOutlineIcon}/>
                Insert the Hashrate planned to be offered as NFTs
            </div>
            <div className={'B2'}> 3. Upload photos from the farm</div>

            <Actions layout={ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL} height={ACTIONS_HEIGHT.HEIGHT_48}>
                <Button
                    onClick={onClickContinue}
                    radius={BUTTON_RADIUS.RADIUS_16}
                >Continue</Button>
            </Actions>
        </>
    )
}

export default (observer(StepFarmDetails));
