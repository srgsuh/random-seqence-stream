export interface NumberSequenceGenerator {
    next(): number;
    hasNext(): boolean;
}