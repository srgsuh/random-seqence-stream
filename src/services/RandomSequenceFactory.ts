import {NumberSequence} from "../model/NumberSequence.ts";
import {SimpleRandomSequence} from "./SimpleRandomSequence.ts";
import {UniqueRandomSequence} from "./UniqueRandomSequence.ts";

export interface RandomGenParams {
    count: number;
    min: number;
    max: number;
}

export type RandomFn = (min: number, max: number) => number;

export class RandomSequenceFactory {
    static buildSequence(params: RandomGenParams, isUnique: boolean): NumberSequence {
        return isUnique?
            new UniqueRandomSequence(params):
            new SimpleRandomSequence(params);
    }
}