import React from 'react'
import CollectionPreview from '../../entities/CollectionPreview';
import ExploreCollectionsStore from '../stores/ExploreCollectionsStore';
import S from '../../../../core/utilities/Main';

import '../styles/top-collections.css';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

interface Props {
    selectedTopCollectionPeriod: number;
    cudosPriceChangeDisplay: string;
    cudosPriceUsd: number;
    topCollectionPreviews: CollectionPreview[];
    changeTopCollectionPeriod: (index: number) => void;
}

export default function TopCollections(props: Props) {

    const navigate = useNavigate();

    return (
        <div className={'TopCollectionsList'}>
            <div className={'HeadingRow Grid GridColumns3'}>
                <div className={'H2 Bold'}>Top Collections</div>
                <div className={'FlexRow PeriodButtonsRowHolder'}>
                    <div className={'PeriodButtonsRow FlexRow'}>
                        {ExploreCollectionsStore.TOP_COLLECTION_PERIODS.map((period, index) => <div
                            key={index}
                            className={`PeriodButton Clickable B3 Semibold ${S.CSS.getActiveClassName(props.selectedTopCollectionPeriod === index)}`}
                            onClick={() => props.changeTopCollectionPeriod(index)}
                        >
                            {period}
                        </div>)}
                    </div>
                </div>
                <div className={'PlaceHolder'}></div>
            </div>
            <div className={'CollectionsGrid Grid GridColumns3'}>
                {props.topCollectionPreviews.map((collection, index) => {
                    return <div
                        key={index}
                        className={'CollectionPreview Clickable'}
                        onClick={() => navigate(`${AppRoutes.COLLECTION_VIEW}/${collection.id}`)}
                    >
                        <div className={'PreviewIndex B2 Bold'}>{index + 1}</div>
                        <div
                            className={'PreviewImage'}
                            style={{
                                backgroundImage: `url("${collection.profileImgurl}")`,
                            }}
                        />
                        <div className={'FlexColumn CollectionPreviewDataColumn'}>
                            <div className={'CollectionName H3 Bold'}>{collection.name}</div>
                            <div className={'HashRate B3'}>Hashrate: {collection.hashRateDisplay()}</div>
                        </div>
                        <div className={'FlexColumn CollectionPreviewDataColumn'}>
                            <div className={'CollectionPriceCudos B2 Bold'}>{collection.priceDisplay()}</div>
                            <div className={'FlexRow CollectionPriceUsd'}>
                                <div className={'CurrentPrice B3 SemiBold'}>{collection.priceUsdDisplay(props.cudosPriceUsd)}</div>
                                <div className={'CurrentPriceChange B3 SemiBold'}>{props.cudosPriceChangeDisplay}</div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
