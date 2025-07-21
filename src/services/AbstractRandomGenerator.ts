import {NumberSequenceGenerator} from "../model/NumberSequenceGenerator.js";
import logger from "../logger.js";

export interface RandomGenParams {
    count: number;
    min: number;
    max: number;
}

export class GeneratorError extends Error {
    paramName: keyof RandomGenParams;

    constructor(paramName: keyof RandomGenParams, message: string) {
        super(message);
        this.paramName = paramName;
    }
}

export class AbstractRandomGenerator implements NumberSequenceGenerator{
    private _generator: Generator<number>;
    private _isDone: false | true | undefined = false;

    protected constructor(params: RandomGenParams, generator: Generator<number>) {
        this._validateParameters(params);
        this._generator = generator;
    }

    protected _validateParameters(params: RandomGenParams) {
        if (params.count < 0) {
            throw new GeneratorError("count", "Count must be greater than 0");
        }
    }

    next(): number {
        const {done, value} = this._generator.next();
        logger.debug(`Next value: ${value}, done: ${done}`);
        return value;
    }

    hasNext() {
        return !this._isDone;
    }
}