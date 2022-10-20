import React, { useState } from 'react';
import S from '../../../../core/utilities/Main';
import LaunchIcon from '@mui/icons-material/Launch';

import SvgEthereum from '../../../../public/assets/vectors/ethereum-logo.svg';

import '../styles/nft-view-history.css'
import { ALIGN_CENTER, ALIGN_LEFT } from '../../../../core/presentation/components/TableDesktop';
import TableStore from '../../../../core/presentation/stores/TableStore';
import Table from '../../../../core/presentation/components/Table';
import TableCell from '../../../../core/entities/TableCell';
import TableRow from '../../../../core/entities/TableRow';
import TextWithTooltip from '../../../../core/presentation/components/TextWithTooltip';
import Svg from '../../../../core/presentation/components/Svg';
import NavRowTabs from '../../../../core/presentation/components/NavRowTabs';

const PAGE_STATISTICS = 0;
const PAGE_EARNINGS = 1;
const PAGE_HISTORY = 2;

const HISTORY_PAGES = [];

HISTORY_PAGES[PAGE_STATISTICS] = 'Reward Statistics';
HISTORY_PAGES[PAGE_EARNINGS] = 'Earnings Info';
HISTORY_PAGES[PAGE_HISTORY] = 'History';

const PERIOD_TODAY = 0;
const PERIOD_WEEK = 1;
const PERIOD_MONTH = 2;

const PERIOD_SETTINGS = [];

PERIOD_SETTINGS[PERIOD_TODAY] = 'Today';
PERIOD_SETTINGS[PERIOD_WEEK] = '7 Days';
PERIOD_SETTINGS[PERIOD_MONTH] = '30 Days';

const EARNINGS_TABLE_LEGEND = ['', 'UTC Time', 'Local Time (-4:00 EDT)'];
const EARNINGS_ROW_LEGEND = ['FPPS Calculation Period', 'Earnings Posting Time', 'Daily Payout Window', 'Minimum Daily Auto-withdraw'];
const EARNINGS_ROW_LEGEND_TOOLTIP = ['TOOLTIP', 'TOOLTIP', 'TOOLTIP', 'TOOLTIP'];
const EARNINGS_TABLE_WIDTHS = ['40%', '30%', '30%']
const EARNINGS_TABLE_ALINGS = [
    ALIGN_LEFT,
    ALIGN_CENTER,
    ALIGN_LEFT,
]

const HISTORY_TABLE_LEGEND = ['Event', 'Price', 'From', 'To', 'Date'];
const HISTORY_TABLE_WIDTHS = ['20%', '20%', '20%', '20%', '20%']
const HISTORY_ROW_LEGEND = ['Transfer', 'Sale', 'Transfer', 'Minted'];
const HISTORY_TABLE_ALINGS = [
    ALIGN_LEFT,
    ALIGN_LEFT,
    ALIGN_LEFT,
    ALIGN_LEFT,
    ALIGN_LEFT,
]

export default function NftViewHistory() {
    const [historyPage, setHistoryPage] = useState(PAGE_EARNINGS);
    const [periodSetting, setPeriodSetting] = useState(PERIOD_TODAY);
    const historyPageTabs = [
        {
            navName: HISTORY_PAGES[PAGE_STATISTICS],
            isActive: historyPage === PAGE_STATISTICS,
            onClick: () => setHistoryPage(PAGE_STATISTICS),
        },
        {
            navName: HISTORY_PAGES[PAGE_EARNINGS],
            isActive: historyPage === PAGE_EARNINGS,
            onClick: () => setHistoryPage(PAGE_EARNINGS),
        },
        {
            navName: HISTORY_PAGES[PAGE_HISTORY],
            isActive: historyPage === PAGE_HISTORY,
            onClick: () => setHistoryPage(PAGE_HISTORY),
        },
    ]

    return (
        <div className={'NftPreviewHistory FlexColumn'}>
            <NavRowTabs navTabs={historyPageTabs} />
            <div className={'HistoryContainer FlexColumn'}>
                <div className={'HistoryContainerHeader FlexRow'}>
                    <div className={'Heading3'}>{HISTORY_PAGES[historyPage]}</div>
                </div>
                <div className={'HistoryDataContainer FlexColumn'}>
                    {historyPage === PAGE_STATISTICS ? <div></div> : ''}
                    {historyPage === PAGE_EARNINGS
                        ? <Table
                            className={'EarningsTable'}
                            legend={EARNINGS_TABLE_LEGEND}
                            widths={EARNINGS_TABLE_WIDTHS}
                            aligns={EARNINGS_TABLE_ALINGS}
                            tableStore={new TableStore(0, [], () => {}, 5)}
                            rows={renderEarningsRows()}
                        /> : ''}
                    {historyPage === PAGE_HISTORY
                        ? <Table
                            className={'HistoryTable'}
                            legend={HISTORY_TABLE_LEGEND}
                            widths={HISTORY_TABLE_WIDTHS}
                            aligns={HISTORY_TABLE_ALINGS}
                            tableStore={new TableStore(0, [], () => {}, 5)}
                            rows={renderHistoryRows()}
                        /> : ''}
                </div>
            </div>
        </div>
    )
}

function renderEarningsRows() {
    const rows = [];

    for (let i = 0; i < 4; i++) {
        const cells = [];
        cells.push(new TableCell(<div className={'RowLegend'}><TextWithTooltip text={EARNINGS_ROW_LEGEND[i]} tooltipText={EARNINGS_ROW_LEGEND_TOOLTIP[i]} /></div>, 0))
        cells.push(new TableCell(<div>00:00 - 23:59</div>, 0))
        cells.push(new TableCell(<div>20:00 - 19:59</div>, 0))

        rows.push(new TableRow(cells));
    }

    return rows;
}

function renderHistoryRows() {
    const rows = [];

    for (let i = 0; i < 4; i++) {
        const cells = [];
        cells.push(new TableCell(<div className={'RowLegend'}>{HISTORY_ROW_LEGEND[i]}</div>, 0))
        cells.push(new TableCell(<div className={'FlexRow HistoryPrice'}>
            <Svg svg={SvgEthereum} />
            1.65 ETH
        </div>, 0))
        cells.push(new TableCell(<div>Harley</div>, 0))
        cells.push(new TableCell(<div>IDK</div>, 0))
        cells.push(new TableCell(<div>
            3 months ago
            <Svg svg={LaunchIcon} />
        </div>, 0))

        rows.push(new TableRow(cells));
    }

    return rows;
}
