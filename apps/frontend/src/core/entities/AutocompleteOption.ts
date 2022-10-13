export default class AutocompleteOption {

    value: any;
    label: any;

    constructor(value: any, label: any = null) {
        if (label === null) {
            label = value;
        }

        this.value = value;
        this.label = typeof (label) === 'number' ? label.toString() : label;
    }

}
