import {Readable} from "node:stream";
import {NumberSequence} from "../model/NumberSequence.ts";
import {RandomSequenceFactory} from "./RandomSequenceFactory.ts";

export interface RandomSequenceStreamOptions {
    count: number;
    min: number;
    max: number;
    isUnique: boolean;
}

export class RandomSequenceStream extends Readable{
    private _sequence: NumberSequence;
    constructor({count, max, min, isUnique}: RandomSequenceStreamOptions) {
        super();
        this._sequence = RandomSequenceFactory.createGenerator({min, max, count}, isUnique);
    }
    _read() {
        const value = this._sequence.next();
        this.push(value? value.toString() : null, "utf-8");
    }
}