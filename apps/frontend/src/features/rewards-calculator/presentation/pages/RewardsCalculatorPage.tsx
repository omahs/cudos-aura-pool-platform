import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import PageFooter from '../../../../features/footer/presentation/components/PageFooter';
import PageHeader from '../../../header/presentation/components/PageHeader';

import Input, { InputType } from '../../../../core/presentation/components/Input';
import RewardsCalculatorStore from '../stores/RewardsCalculatorStore';
import TextWithTooltip from '../../../../core/presentation/components/TextWithTooltip';
import { Slider, InputAdornment } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

import S from '../../../../core/utilities/Main';
import '../styles/page-rewards-calculator-component.css';
import MiningFarmEntity from '../../../mining-farm/entities/MiningFarmEntity';
import Autocomplete from '../../../../core/presentation/components/Autcomplete';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import AutocompleteOption from '../../../../core/entities/AutocompleteOption';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';

type Props = {
    rewardsCalculatorStore?: RewardsCalculatorStore
}

function RewardsCalculatorPage({ rewardsCalculatorStore }: Props) {
    const [networkDifficultyEditEnabled, setNetworkDifficultyEditEnabled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function run() {
            rewardsCalculatorStore.init();
        }
        run();
    }, []);

    function onClickExploreNftAndBuy() {
        navigate(AppRoutes.EXPLORE_NFTS);
    }

    function toggleDifficultyEdit() {
        setNetworkDifficultyEditEnabled(!networkDifficultyEditEnabled);
    }

    const selectedFarmIndex = rewardsCalculatorStore.selectedFarmIndex;
    const selectedFarmName = rewardsCalculatorStore.getSelectedFarmName();

    const bitcoinPrice = rewardsCalculatorStore.bitcoinStore.getBitcoinPrice();
    const bitcoinPriceChange = rewardsCalculatorStore.bitcoinStore.getBitcoinPriceChange();

    const networkDifficulty = rewardsCalculatorStore.getNetworkDifficulty();

    return (
        <PageLayoutComponent className = { 'PageRewardsCalculator' }>

            <PageHeader />

            <div className={'PageContent AppContent'} >
                <div className={'RewardsCalculator'}>
                    <div className={'FlexRow RewardsCalculatorHeading'}>
                        <div className={'H2'}>Calculate Your Potential Rewards</div>
                        <Actions height = { ACTIONS_HEIGHT.HEIGHT_48 }>
                            <Button
                                onClick={onClickExploreNftAndBuy}
                                padding={BUTTON_PADDING.PADDING_24}
                                type={BUTTON_TYPE.ROUNDED}
                            >Explore NFTs & Buy</Button>
                        </Actions>
                    </div>
                    <div className={'H3 RewardsCalculatorSubHeading'}>Here we have some description text that leads the user to properly calculate the rewards</div>
                    <div className={'Grid GridColumns2 LayoutContainer'}>
                        <div className={'FlexSingleCenter MiningFarmForm BorderContainer'}>
                            <div className = { 'FlexColumn MiningFarmFormWidth' } >
                                <Autocomplete
                                    label = {
                                        <TextWithTooltip
                                            text={'Select Mining Farm'}
                                            tooltipText={'info'}
                                        />
                                    }
                                    onChange={rewardsCalculatorStore.selectFarmPool}
                                    value={selectedFarmIndex === S.NOT_EXISTS ? null : new AutocompleteOption(selectedFarmIndex, selectedFarmName)}
                                    options = {
                                        rewardsCalculatorStore.miningFarms.map((farm: MiningFarmEntity, i: number) => new AutocompleteOption(i, farm.name))
                                    } />
                                <Input
                                    label = {
                                        <TextWithTooltip
                                            text={'Hash Rate'}
                                            tooltipText={'info'}
                                        />
                                    }
                                    inputType={InputType.INTEGER}
                                    value = {rewardsCalculatorStore.hashRateTh}
                                    onChange = { rewardsCalculatorStore.onChangeHashRate }
                                />
                                <Slider defaultValue={50}
                                    aria-label="Default"
                                    sx={{
                                        color: '#000',
                                        '& .MuiSlider-thumb': {
                                            color: '#fff',
                                        },
                                    }}
                                    valueLabelDisplay="auto"
                                    value={rewardsCalculatorStore.hashRateTh}
                                    onChange={rewardsCalculatorStore.onChangeHashRateSlider}
                                    min={0}
                                    max={10000000}/>
                                <div className={'FlexRow NetworkDifficulty'}>
                                    <Input
                                        label = {
                                            <TextWithTooltip
                                                text={'Network Difficulty'}
                                                tooltipText={'info'}
                                            />
                                        }
                                        inputType={InputType.INTEGER}
                                        readOnly={networkDifficultyEditEnabled === false}
                                        value={networkDifficulty}
                                        onChange = { rewardsCalculatorStore.onEditNetworkDifficulty }
                                        gray = { networkDifficultyEditEnabled === false }
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end" >
                                                <Svg className = { 'EnableEditButton' } size = { SvgSize.CUSTOM } svg={DriveFileRenameOutlineIcon} onClick={toggleDifficultyEdit} />
                                            </InputAdornment>,
                                        }}
                                    />
                                </div>
                                <Actions layout={ACTIONS_LAYOUT.LAYOUT_ROW_CENTER} height={ACTIONS_HEIGHT.HEIGHT_48}>
                                    <Button onClick={rewardsCalculatorStore.resetDefaults} > Calculate values </Button>
                                </Actions>
                            </div>
                        </div>
                        <div className={'DataContainer FlexColumn'}>
                            <div className={'BtcPriceContainer FlexColumn BorderContainer'}>
                                <div className={'FlexRow'}>
                                    <div className={'H2 BtcPrice'}>$ {bitcoinPrice} USD</div>
                                    <div className={'PriceChange FlexRow'}>
                                        <div className={'PriceText'}>{rewardsCalculatorStore.getPriceChangeFormated()}</div>
                                        {bitcoinPriceChange >= 0
                                            ? <Svg svg={ArrowOutwardIcon}/>
                                            : <Svg svg={SouthEastIcon}/>
                                        }
                                    </div>
                                </div>
                                <div className={'SubHeading'}>Current Bitcoin Price</div>
                            </div>
                            <div className={'FarmDataContainer FlexColumn BorderContainer'}>
                                <div className={'DataRow FlexRow'}>
                                    <TextWithTooltip
                                        className={'DataRowHeading'}
                                        text={'Cost'}
                                        tooltipText={'info'}
                                    />
                                    <div className={'DataRowValue'}>{rewardsCalculatorStore.getPowerCostDisplay()}</div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <TextWithTooltip
                                        className={'DataRowHeading'}
                                        text={'Pool Fee'}
                                        tooltipText={'info'}
                                    />
                                    <div className={'DataRowValue'}>{rewardsCalculatorStore.getPoolFeeDisplay()}</div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <TextWithTooltip
                                        className={'DataRowHeading'}
                                        text={'Power Consumption'}
                                        tooltipText={'info'}
                                    />
                                    <div className={'DataRowValue'}>{rewardsCalculatorStore.getPowerConsumptionDisplay()}</div>
                                </div>
                                <div className={'DataRow FlexRow'}>
                                    <TextWithTooltip
                                        className={'DataRowHeading'}
                                        text={'Block Reward'}
                                        tooltipText={'info'}
                                    />
                                    <div className={'DataRowValue'}>{rewardsCalculatorStore.getBlockRewardDisplay()}</div>
                                </div>
                            </div>
                            <div className={'RewardsEstimateContainer FlexColumn'}>
                                <div className={'RewardsEstimateHeading'}>Your Monthly Rewards</div>
                                <div className={'FlexRow'}>
                                    <div className={'H2 RewardsInBtc'}>0.000000 BTC</div>
                                    <div className={'FlexColumn'}>
                                        <div className={'MonthlyRewardUsd'}>$ 0.00 USD</div>
                                        <div className={'Discretion'}>Based on Today’s BTC Price</div>
                                    </div>
                                </div>
                            </div>
                            <div className = { 'Disclaimer' } > *This forecast is indicative </div>
                        </div>
                    </div>
                </div>
            </div>

            <PageFooter />

        </PageLayoutComponent>
    )
}

export default inject((stores) => stores)(observer(RewardsCalculatorPage));
