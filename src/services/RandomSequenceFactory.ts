import {NumberSequence} from "../model/NumberSequence.ts";
import {SimpleRandomSequence} from "./SimpleRandomSequence.ts";

export interface RandomGenParams {
    count: number;
    min: number;
    max: number;
}

export type RandomFn = (min: number, max: number) => number;

export class RandomSequenceFactory {
    static createGenerator(params: RandomGenParams): NumberSequence {
        return new SimpleRandomSequence(params);
    }
}