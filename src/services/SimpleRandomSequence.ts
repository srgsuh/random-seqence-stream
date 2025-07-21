import {AbstractRandomSequence, RandomGenParams} from "./AbstractRandomSequence.ts";
import _ from "lodash";
import logger from "../logger.js";

export class SimpleRandomSequence extends AbstractRandomSequence{
    constructor(params: RandomGenParams) {
        super(params, SimpleRandomSequence._generate(params));
    }

    private static *_generate({count, max, min}: RandomGenParams): Generator<number> {
        logger.debug("SimpleRandomSequence: generating sequence");
        for (let i = 0; i < count; i++) {
            yield AbstractRandomSequence.random(min, max);
        }
    }
}