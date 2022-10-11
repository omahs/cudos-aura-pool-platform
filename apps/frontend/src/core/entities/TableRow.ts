import S from '../utilities/Main';
import TableCell from './TableCell';

export default class TableRow {

    cells: TableCell[];
    rowClassName: string;

    constructor(cells: TableCell[], rowClassName: string = S.Strings.EMPTY) {
        this.cells = cells;
        this.rowClassName = rowClassName;
    }
}
