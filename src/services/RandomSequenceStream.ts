import {Readable} from "node:stream";
import {NumberSequence} from "../model/NumberSequence.ts";
import {RandomSequenceFactory} from "./RandomSequenceFactory.ts";
import logger from "../logger.ts";

const DEFAULT_STREAM_OPTIONS = {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    isUnique: false
}

export class RandomSequenceStream extends Readable{
    private _sequence: NumberSequence;
    constructor(count: number,
                min: number = DEFAULT_STREAM_OPTIONS.min,
                max: number = DEFAULT_STREAM_OPTIONS.max,
                isUnique: boolean = DEFAULT_STREAM_OPTIONS.isUnique
    ) {
        super();
        this._sequence = RandomSequenceFactory.buildSequence({min, max, count}, isUnique);
    }
    _read() {
        const value = this._sequence.next();
        this.push(value === null? null : value.toString(), "utf-8");
    }
}