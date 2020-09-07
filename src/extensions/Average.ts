import { Enumerable } from '../collections/Enumerable';
import { Errors } from '../Errors';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Computes the average of a sequence that are obtained by invoking a transform function on each element of the input sequence. */
        average(selector?: (element: T, index: number) => number): number;
    }
}

function average<T>(this: Enumerable<T>, selector?: (element: T, index: number) => number): number {
    let index = 0;
    let sum = 0;
    for (const element of this) {
        const value = selector != null ? selector(element, index) : element;
        if (typeof value !== 'number') {
            throw Errors.valueIsNotNumber();
        }

        sum += value;
        index++;
    }

    if (index === 0) {
        throw Errors.noElements();
    }

    return sum / index;
}

Enumerable.prototype.average = average;
