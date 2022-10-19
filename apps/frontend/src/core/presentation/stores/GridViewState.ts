import { makeAutoObservable } from 'mobx';
import TableStore from './TableStore';
import S from '../../utilities/Main';

export enum GRID_SETTING {
    DENSE,
    LOOSE
}

export default class GridViewState {

    static DEFAULT_LOOSE_SETTING_SIZE = 12;
    static DEFAULT_DENSE_SETTING_SIZE = 20;

    fetchCallback: () => void;
    looseColumnCount: number;
    denseColumnCount: number;
    maxRows: number;

    gridSetting: number;
    isFetching: boolean;

    tableStore: TableStore;

    constructor(fetchCallback: () => void, looseColumnCount: number, denseColumnCount: number, maxRows: number) {
        this.fetchCallback = fetchCallback;
        this.looseColumnCount = looseColumnCount;
        this.denseColumnCount = denseColumnCount;
        this.maxRows = maxRows;

        this.gridSetting = GRID_SETTING.LOOSE;
        this.isFetching = false;

        this.tableStore = new TableStore(S.NOT_EXISTS, [], fetchCallback, this.calculateItemsPerPageByGridSettings());

        makeAutoObservable(this);
    }

    setGridSettingAndPreviewCount(setting: number) {
        this.gridSetting = setting;
        this.tableStore.tableState.itemsPerPage = this.calculateItemsPerPageByGridSettings();

        this.fetchCallback();
    }

    calculateItemsPerPageByGridSettings() {
        switch (this.gridSetting) {
            case GRID_SETTING.DENSE:
                return this.denseColumnCount * this.maxRows
            case GRID_SETTING.LOOSE:
            default:
                return this.looseColumnCount * this.maxRows;
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
