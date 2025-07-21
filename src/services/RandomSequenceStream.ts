import {Readable} from "node:stream";
import {NumberSequence} from "../model/NumberSequence.ts";
import {RandomSequenceFactory} from "./RandomSequenceFactory.ts";

export class RandomSequenceStream extends Readable{
    private _sequence: NumberSequence;
    constructor(private _count: number, private _min: number, private _max: number) {
        super();
        this._sequence = RandomSequenceFactory.createGenerator({count: _count, min: _min, max: _max});
    }
    _read() {
        const value = this._sequence.next();
        this.push(value? value.toString() : null, "utf-8");
    }
}