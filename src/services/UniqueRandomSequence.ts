import {AbstractRandomSequence, RandomSequenceError, RandomGenParams} from "./AbstractRandomSequence.ts";
import logger from "../logger.ts";

const COUNT_RANGE_RATIO = 0.2;

export class UniqueRandomSequence extends AbstractRandomSequence{
    constructor(params: RandomGenParams) {
        super(params, UniqueRandomSequence.generate(params));
    }

    private static generate(params: RandomGenParams): Generator<number> {
        UniqueRandomSequence._validate(params);

        const ratio = params.count/ (params.max - params.min + 1);
        if (ratio > COUNT_RANGE_RATIO) {
            return UniqueRandomSequence.generateByShuffle(params);
        }
        return UniqueRandomSequence.generateByChoice(params);
    }

    private static *generateByShuffle({count, min, max}: RandomGenParams): Generator<number> {
        logger.debug("UniqueRandomSequence: generating using shuffling");
        const length = max - min + 1;
        const values = Array.from({length}, (_, index) => index + min);
        for (let i = 0; i < count; i++) {
            const randomIndex = AbstractRandomSequence.random(i, length - 1);
            [values[i], values[randomIndex]] = [values[randomIndex], values[i]];
            yield values[i];
        }
    }

    private static *generateByChoice({count, min, max}: RandomGenParams): Generator<number> {
        logger.debug("UniqueRandomSequence: generating with random choice and memoization");
        const set = new Set<number>();
        while (set.size < count) {
            const value = AbstractRandomSequence.random(min, max);
            if (!set.has(value)) {
                set.add(value);
                yield value;
            }
        }
    }

    private static _validate({count, min, max}: RandomGenParams) {
        if (count > max - min + 1) {
            throw new RandomSequenceError(`It's impossible to generate ${count} unique numbers in the range [${min}, ${max}]`);
        }
    }
}