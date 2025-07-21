export interface NumberSequence {
    next(): number | null;
    hasNext(): boolean;
}