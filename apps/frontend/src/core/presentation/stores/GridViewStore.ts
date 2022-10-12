import { makeAutoObservable } from 'mobx';
import TableStore from './TableStore';
import S from '../../utilities/Main';

export enum GRID_SETTING {
    DENSE,
    LOOSE
}

export default class GridViewStore {

    static DEFAULT_LOOSE_SETTING_SIZE = 12;
    static DEFAULT_DENSE_SETTING_SIZE = 20;

    looseColumnCount: number;
    denseColumnCount: number;
    maxRows: number;

    tableStore: TableStore;

    gridSetting: number;
    isFetching: boolean;

    constructor(fetchCallback: () => void, looseColumnCount: number, denseColumnCount: number, maxRows: number) {
        this.looseColumnCount = looseColumnCount;
        this.denseColumnCount = denseColumnCount;
        this.maxRows = maxRows;

        this.tableStore = new TableStore(S.NOT_EXISTS, [], fetchCallback, looseColumnCount * maxRows);

        this.resetDefaults();

        makeAutoObservable(this);
    }

    resetDefaults = () => {
        this.isFetching = false;
        this.setGridSettingAndPreviewCount(GRID_SETTING.LOOSE);
    }

    setGridSettingAndPreviewCount(setting: number) {
        this.gridSetting = setting;

        switch (setting) {
            case GRID_SETTING.DENSE:
                this.tableStore.tableState.itemsPerPage = this.denseColumnCount * this.maxRows
                break;
            case GRID_SETTING.LOOSE:
            default:
                this.tableStore.tableState.itemsPerPage = this.denseColumnCount * this.maxRows;
        }

    }

    getFrom() {
        return this.tableStore.tableState.from;
    }

    getItemsPerPage() {
        return this.tableStore.tableState.itemsPerPage;
    }

    getItemCount() {
        return this.tableStore.tableState.total;
    }

    getGridSettingClass() {
        return this.gridSetting === GRID_SETTING.LOOSE ? `GridColumns${this.looseColumnCount}` : `GridColumns${this.denseColumnCount}`;
    }

    checkIsGridSettingSelected(setting: number): boolean {
        return this.gridSetting === setting;
    }

    setIsLoading(isFetching: boolean) {
        this.isFetching = isFetching;
    }

    setTotalItems(count: number) {
        this.tableStore.tableState.total = count;
    }
}
