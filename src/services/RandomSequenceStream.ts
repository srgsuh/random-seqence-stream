import {Readable} from "node:stream";
import {NumberSequenceGenerator} from "../model/NumberSequenceGenerator.js";
import {RandomSequenceGenerator} from "./RandomSequenceGenerator.js";
import {RandomGeneratorFactory} from "./RandomGeneratorFactory.js";

export class RandomSequenceStream extends Readable{
    private _sequence: NumberSequenceGenerator;
    constructor(private _count: number, private _min: number, private _max: number) {
        super();
        this._sequence = RandomGeneratorFactory.createGenerator({count: _count, min: _min, max: _max, isUnique: false});
    }
    _read() {
        const value = this._sequence.next();
        this.push(value? value.toString() : null, "utf-8");
    }
}