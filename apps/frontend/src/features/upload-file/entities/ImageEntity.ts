import S from '../../../../src/core/utilities/Main';
import { makeAutoObservable } from 'mobx';

export default class ImageEntity {
    id: string;
    type: string;
    sizeBytes: number;
    base64: string;

    constructor() {
        this.id = S.Strings.NOT_EXISTS;
        this.type = S.Strings.EMPTY;
        this.sizeBytes = S.NOT_EXISTS;
        this.base64 = S.Strings.EMPTY;

        makeAutoObservable(this, {
            'type': false,
        });
    }

    isMimeTypeKnown(): boolean {
        return this.type !== S.Strings.EMPTY;
    }

    toJSON(): any {
        return {
            'id': this.id,
            'type': this.type,
            'sizeBytes': this.sizeBytes,
            'base64': this.base64,
        }
    }

    static fromJSON(json): ImageEntity {
        if (json === null) {
            return null;
        }

        const model = new ImageEntity();

        model.id = json.id ?? model.id;
        model.type = json.type ?? model.type;
        model.sizeBytes = Number(json.sizeBytes) ?? model.sizeBytes;
        model.base64 = json.base64 ?? model.base64;

        return model;
    }
}
