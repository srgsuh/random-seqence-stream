import {NumberSequenceGenerator} from "../model/NumberSequenceGenerator.js";
import logger from "../logger.ts";
import {RandomFn} from "./RandomGeneratorFactory.js";
import {RandomSequenceStream} from "./RandomSequenceStream.js";
import {AbstractRandomGenerator, RandomGenParams} from "./AbstractRandomGenerator.ts";



export class RandomSequenceGenerator extends AbstractRandomGenerator{
    constructor(params: RandomGenParams, random: RandomFn) {
        super(params, RandomSequenceGenerator._generate(params, random));
    }

    private static *_generate({count, max, min}: RandomGenParams, random: RandomFn): Generator<number> {
        for (let i = 0; i < count; i++) {
            yield random(min, max);
        }
    }
}