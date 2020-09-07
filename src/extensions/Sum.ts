import { Enumerable } from '../collections/Enumerable';
import { Errors } from '../Errors';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Computes the sum of the sequence that are obtained by invoking a transform function on each element of the input sequence. */
        sum(selector?: (element: T, index: number) => number): number;
    }
}

function sum<T>(this: Enumerable<T>, selector?: (element: T, index: number) => number): number {
    let index = 0;
    let s = 0;
    for (const element of this) {
        const value: unknown = selector != null ? selector(element, index++) : element;
        if (typeof value !== 'number') {
            throw Errors.valueIsNotNumber();
        }

        s += value;
    }
    return s;
}

Enumerable.prototype.sum = sum;
