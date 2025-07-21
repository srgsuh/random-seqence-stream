import {NumberSequenceGenerator} from "../model/NumberSequenceGenerator.js";
import _ from "lodash";
import {RandomSequenceGenerator} from "./RandomSequenceGenerator.js";

export interface RandomGenParams {
    count: number;
    min: number;
    max: number;
    isUnique: boolean;
}

export type RandomFn = (min: number, max: number) => number;

export class RandomGeneratorFactory {
    static createGenerator(params: RandomGenParams): NumberSequenceGenerator {
        return new RandomSequenceGenerator(params, _.random);
    }
}