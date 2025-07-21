import {AbstractRandomSequence, RandomGenParams} from "./AbstractRandomSequence.ts";
import _ from "lodash";



export class SimpleRandomSequence extends AbstractRandomSequence{
    constructor(params: RandomGenParams) {
        super(params, SimpleRandomSequence._generate(params));
    }

    private static *_generate({count, max, min}: RandomGenParams): Generator<number> {
        for (let i = 0; i < count; i++) {
            yield _.random(min, max);
        }
    }
}