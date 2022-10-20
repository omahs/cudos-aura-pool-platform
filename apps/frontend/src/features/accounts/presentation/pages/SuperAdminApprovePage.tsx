import React, { useEffect, useState } from 'react';

import '../styles/page-admin-portal-component.css';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import { inject, observer } from 'mobx-react';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import SuperAdminApprovePageState from '../stores/SuperAdminApprovePageState';
import Table from '../../../../core/presentation/components/Table';
import { ALIGN_CENTER, ALIGN_LEFT } from '../../../../core/presentation/components/TableDesktop';
import RepoStore from '../../../../core/presentation/stores/RepoStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import TableCell from '../../../../core/entities/TableCell';
import Checkbox from '../../../../core/presentation/components/Checkbox';
import TableRow from '../../../../core/entities/TableRow';

type Props = {
    repoStore?: RepoStore;
    appStore?: AppStore;
}

const TABLE_LEGEND = ['name', 'Select'];
const TABLE_WIDTHS = ['80%', '20%']
const TABLE_ALINGS = [
    ALIGN_LEFT,
    ALIGN_CENTER,
]

function SuperAdminApprovePage({ repoStore, appStore }: Props) {
    const [superAdminApprovePageState] = useState(new SuperAdminApprovePageState(repoStore));

    const miningFarmEntities = superAdminApprovePageState.miningFarmEntities;
    const collectionEntities = superAdminApprovePageState.collectionEntities;

    useEffect(() => {
        appStore.useLoading(() => {
            superAdminApprovePageState.init();
        })
    }, []);

    function renderFarmsRows() {
        const rows = [];

        miningFarmEntities.forEach((miningFarmEntity) => {
            const rowCells = [];
            rowCells.push(new TableCell(miningFarmEntity.name, 0));
            rowCells.push(new TableCell(
                <Checkbox
                    label={''}
                    value={() => superAdminApprovePageState.isMiningFarmEntitySelected(miningFarmEntity.id)}
                    onChange={() => superAdminApprovePageState.toggleMiningFarmSelection(miningFarmEntity.id)}
                />,
                0,
            ));
            rows.push(new TableRow(rowCells));
        })

        return rows;
    }

    function renderCollectionsRows() {
        const rows = [];

        collectionEntities.forEach((collectionEntity) => {
            const rowCells = [];
            rowCells.push(new TableCell(collectionEntity.name, 0));
            rowCells.push(new TableCell(
                <Checkbox
                    label={''}
                    value={() => superAdminApprovePageState.isCollectionEntitySelected(collectionEntity.id)}
                    onChange={() => superAdminApprovePageState.toggleCollectionSelection(collectionEntity.id)}
                />,
                0,
            ));
            rows.push(new TableRow(rowCells));
        })

        return rows;
    }

    return (
        <PageLayoutComponent
            className = { 'PageAdminPortal' }>
            <PageHeader />
            <Table
                className={'New Farms'}
                legend={TABLE_LEGEND}
                widths={TABLE_WIDTHS}
                aligns={TABLE_ALINGS}
                tableStore={superAdminApprovePageState.farmsTableState}
                rows={renderFarmsRows()}
            />
            <Table
                className={'New Collections'}
                legend={TABLE_LEGEND}
                widths={TABLE_WIDTHS}
                aligns={TABLE_ALINGS}
                tableStore={superAdminApprovePageState.collectionsTableState}
                rows={renderCollectionsRows()}
            />
            <PageFooter />
        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(SuperAdminApprovePage));
