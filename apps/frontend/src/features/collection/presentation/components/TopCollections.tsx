import React from 'react'
import CollectionEntity from '../../entities/CollectionEntity';
import MarketplaceStore from '../stores/MarketplaceStore';
import S from '../../../../core/utilities/Main';

import '../styles/top-collections.css';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

interface Props {
    selectedTopCollectionPeriod: number;
    cudosPriceChangeDisplay: string;
    cudosPriceUsd: number;
    topCollectionEntities: CollectionEntity[];
    changeTopCollectionPeriod: (index: number) => void;
}

export default function TopCollections({ selectedTopCollectionPeriod, cudosPriceChangeDisplay, cudosPriceUsd, topCollectionEntities, changeTopCollectionPeriod }: Props) {

    const navigate = useNavigate();

    return (
        <div className={'TopCollectionsList'}>
            <div className={'HeadingRow Grid GridColumns3'}>
                <div className={'H2 Bold'}>Top Collections</div>
                <div className={'FlexRow PeriodButtonsRowHolder'}>
                    <div className={'PeriodButtonsRow FlexRow'}>
                        {MarketplaceStore.TOP_COLLECTION_PERIODS.map((period, index) => <div
                            key={index}
                            className={`PeriodButton Clickable B3 Semibold ${S.CSS.getActiveClassName(selectedTopCollectionPeriod === index)}`}
                            onClick={() => changeTopCollectionPeriod(index)}
                        >
                            {period}
                        </div>)}
                    </div>
                </div>
                <div className={'PlaceHolder'}></div>
            </div>
            <div className={'CollectionsGrid Grid GridColumns3'}>
                {topCollectionEntities.map((collectionEntity, index) => {
                    return <div
                        key={index}
                        className={'CollectionPreview Clickable'}
                        onClick={() => navigate(`${AppRoutes.COLLECTION_VIEW}/${collectionEntity.id}`)}
                    >
                        <div className={'PreviewIndex B2 Bold'}>{index + 1}</div>
                        <div
                            className={'PreviewImage'}
                            style={{
                                backgroundImage: `url("${collectionEntity.profileImgurl}")`,
                            }}
                        />
                        <div className={'FlexColumn CollectionPreviewDataColumn'}>
                            <div className={'CollectionName H3 Bold'}>{collectionEntity.name}</div>
                            <div className={'HashRate B3'}>Hashrate: {collectionEntity.hashRateDisplay()}</div>
                        </div>
                        <div className={'FlexColumn CollectionPreviewDataColumn'}>
                            <div className={'CollectionPriceCudos B2 Bold'}>{collectionEntity.priceDisplay()}</div>
                            <div className={'FlexRow CollectionPriceUsd'}>
                                <div className={'CurrentPrice B3 SemiBold'}>{collectionEntity.priceUsdDisplay(cudosPriceUsd)}</div>
                                <div className={'CurrentPriceChange B3 SemiBold'}>{cudosPriceChangeDisplay}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
