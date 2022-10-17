import Svg from '../../../../core/presentation/components/Svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SvgCudosLogo from '../../../../public/assets/vectors/cudos-logo.svg';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import '../styles/mining-farm-preview.css';

interface Props {
    miningFarmEntity: MiningFarmEntity,
}

export default function MiningFarmPeview({ miningFarmEntity }: Props) {
    const navigate = useNavigate();

    const onClickMiningFarm = () => {
        navigate(`${AppRoutes.FARM_VIEW}/${miningFarmEntity.id}`);
    }

    return (
        <div className={'MiningFarmPreview FlexColumn BorderContainer'} onClick={onClickMiningFarm}>
            <div
                className={'MiningFarmPreviewCoverImage'}
                style={{
                    backgroundImage: `url("${miningFarmEntity.coverImgUrl}")`,
                }}
            >
                <div
                    className="MiningFarmPreviewProfileImage"
                    style={{
                        backgroundImage: `url("${miningFarmEntity.profileImgurl}")`,
                    }}
                />
            </div>
            <div className={'CollectionName H3 Bold'}>{miningFarmEntity.name}</div>
            <div className={'CollectionName B3'}>{miningFarmEntity.description}</div>
            <div className={'BorderContainer FlexColumn B3'}>
                {/* TODO: get real data */}
                <div className={'DataRow FlexRow'}>
                    <div className={'DataName'}>Total Hashrate</div>
                    <div className={'DataValue'}>102.000 EH/s</div>
                </div>
                <div className={'DataRow FlexRow'}>
                    <div className={'DataName'}>NFTs Owned</div>
                    <div className={'DataValue'}>1400</div>
                </div>
                <div className={'DataRow FlexRow'}>
                    <div className={'DataName'}>Total NFTs Sold</div>
                    <div className={'DataValue'}>735</div>
                </div>
            </div>
        </div>
    );
}
