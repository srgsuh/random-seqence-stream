import {Readable} from "node:stream";
import {NumberSequenceGenerator} from "../model/NumberSequenceGenerator.js";
import {RandomSequenceGenerator} from "./RandomSequenceGenerator.js";

export class RandomSequenceStream extends Readable{
    private _generator: NumberSequenceGenerator;
    constructor(private _count: number, private _min: number, private _max: number) {
        super();
        this._generator = new RandomSequenceGenerator(_count, _min, _max);
    }
    _read() {
        if (this._generator.hasNext()) {
            this.push(`${this._generator.next()}\n`, 'utf8');
        }
        else {
            this.push(null);
        }
    }
}