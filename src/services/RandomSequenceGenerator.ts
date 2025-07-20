import {NumberSequenceGenerator} from "../model/NumberSequenceGenerator.js";

export interface GeneratorError extends Error {
    paramName: string;
}

export interface RandomGenParams {
    count: number;
    min: number;
    max: number;
}

export class RandomSequenceGenerator implements NumberSequenceGenerator{
    _generator: Generator<number>;
    _isDone: false | true | undefined = false;

    constructor(private _count: number, private _min: number, private _max: number) {
        this._validateInput();
        console.log(this._count, this._min, this._max);
        this._generator = this._generate();
    }
    protected _validateInput() {
        if (this._count < 0) {
            throw new Error("Count must be greater than 0");
        }
    }

    protected *_generate(): Generator<number> {
        for (let i = 0; i < this._count; i++) {
            yield Math.random();
        }
    }

    next(): number {
        const {done, value} = this._generator.next();
        this._isDone = done;
        return value;
    }

    hasNext() {
        return !this._isDone;
    }
}