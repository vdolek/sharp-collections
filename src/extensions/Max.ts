import { Enumerable } from '../collections/Enumerable';
import { Errors } from '../Errors';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Invokes a transform function on each element of a sequence and returns the maximum value. */
        max(selector?: (element: T, index: number) => number): number;
    }
}

function max<T>(this: Enumerable<T>, selector?: (element: T, index: number) => number): number {
    let index = 0;
    let maxValue = Number.NaN;
    for (const element of this) {
        const value = selector != null ? selector(element, index) : element;
        if (typeof value !== 'number') {
            throw Errors.valueIsNotNumber();
        }

        if (isNaN(maxValue) || maxValue < value) {
            maxValue = value;
        }

        index++;
    }

    if (index === 0) {
        throw Errors.noElements();
    }

    return maxValue;
}

Enumerable.prototype.max = max;
