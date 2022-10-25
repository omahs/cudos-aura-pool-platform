import { checkValidAddress, isValidAddress } from 'cudosjs';
import { makeAutoObservable, observable } from 'mobx';
import S from '../../utilities/Main';
import { validate } from 'bitcoin-address-validation';

class InputValidation {
    errorMessage: string;
    isError: boolean;
    checkValidInput: (value: any) => boolean;

    constructor() {
        this.errorMessage = S.Strings.EMPTY;
        this.isError = false;
        this.checkValidInput = null;

        makeAutoObservable(this);
    }

    onChange = (value: any) => {
        this.isError = this.checkValidInput(value) === false;
    }

    setErrorMessage(errorMessage?: string) {
        if (errorMessage !== undefined) {
            this.errorMessage = errorMessage;
        }
    }

    static emptyValidation(errorMessage?: string): InputValidation {
        const validation = new InputValidation();

        validation.setErrorMessage(errorMessage);
        validation.checkValidInput = (value) => value !== S.Strings.EMPTY;

        return validation;
    }

    static matchStringsValidation(errorMessage: string, secondString: string): InputValidation {
        const validation = new InputValidation();

        validation.setErrorMessage(errorMessage);
        validation.checkValidInput = (value) => value === secondString;

        return validation;
    }

    static emailValidation(errorMessage?: string) {
        const validation = new InputValidation();

        validation.setErrorMessage(errorMessage);
        validation.checkValidInput = (value) => {
            const result = value.toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
            return result !== null;
        };
        return validation;
    }

    static passwordValidation(errorMessage?: string) {
        const validation = new InputValidation();

        validation.setErrorMessage(errorMessage);
        validation.checkValidInput = (value) => value.length >= 6;

        return validation;
    }

    static cudosAddressValidation(errorMessage?: string) {
        const validation = new InputValidation();

        validation.setErrorMessage(errorMessage);
        validation.checkValidInput = (value) => isValidAddress(value);

        return validation;
    }

    static bitcoinAddressValidation(errorMessage?: string) {
        const validation = new InputValidation();

        validation.setErrorMessage(errorMessage);
        validation.checkValidInput = (value) => validate(value);

        return validation;
    }
}

export default class ValidationState {

    inputValidations: InputValidation[];

    constructor() {
        this.inputValidations = [];

        makeAutoObservable(this);
    }

    addValidation(errorMessage, checkValidInput): InputValidation {
        const inputValidation = new InputValidation();
        inputValidation.errorMessage = errorMessage;
        inputValidation.checkValidInput = checkValidInput;

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    addEmptyValidation(errorMessage?: string): InputValidation {
        const inputValidation = InputValidation.emptyValidation(errorMessage);

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    addMatchStringsValidation(secondString: string, errorMessage?: string): InputValidation {
        const inputValidation = InputValidation.matchStringsValidation(errorMessage, secondString);

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    addEmailValidation(errorMessage?: string) {
        const inputValidation = InputValidation.emailValidation(errorMessage);

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    addPasswordValidation(errorMessage?: string) {
        const inputValidation = InputValidation.passwordValidation(errorMessage);

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    addCudosAddressValidation(errorMessage?: string) {
        const inputValidation = InputValidation.cudosAddressValidation(errorMessage);

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    addBitcoinAddressValidation(errorMessage?: string) {
        const inputValidation = InputValidation.bitcoinAddressValidation(errorMessage);

        this.inputValidations.push(inputValidation);

        return inputValidation;
    }

    getIsErrorPresent(): boolean {
        const validation = this.inputValidations.values.array.find((element) => {
            return element.isError === true;
        });

        return validation !== null;
    }
}
