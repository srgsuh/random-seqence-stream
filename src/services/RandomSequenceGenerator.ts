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

    constructor(private _count: number, private _min: number, private _max: number) {
        this._validateInput();
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

    next() {
        return this._generator.next().value;
    }

    hasNext() {
        return this._generator.next().done === false;
    }
}