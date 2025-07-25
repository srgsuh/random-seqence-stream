import {NumberSequence} from "../model/NumberSequence.ts";
import logger from "../logger.ts";
import _ from "lodash";

export interface RandomGenParams {
    count: number;
    min: number;
    max: number;
}

export class RandomSequenceError extends Error {}

type testFn = (p: RandomGenParams) => boolean;

const CHECKS: {test: testFn, message: string}[] = [
    {
        test: (p) => Object.values(p).some(
            (value) => !Number.isInteger(value)
        ),
        message: `All parameters must be valid integers`
    },
    {
        test: ({count})=> (count <= 0),
        message: "Parameter count must be positive"
    },
    {
        test: ({min, max})=> (min > max),
        message: "Parameter min cannot be greater than parameter max"
    },
]

export abstract class AbstractRandomSequence implements NumberSequence{
    private _generator: Generator<number>;

    protected constructor(params: RandomGenParams, generator: Generator<number>) {
        AbstractRandomSequence._validateParameters(params);
        this._generator = generator;
    }

    private static _validateParameters(params: RandomGenParams) {
        const message = CHECKS.find((check) => check.test(params))?.message;
        if (message) {
            throw new RandomSequenceError(message);
        }
    }

    static random(min: number, max: number): number {
        return _.random(min, max);
    }

    next(): number {
        const {done, value} = this._generator.next();
        logger.debug(`Sequence emit next value: ${value}, done: ${done}`);
        return value ?? null;
    }
}