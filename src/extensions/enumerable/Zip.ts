import { Enumerable } from '../../collections/Enumerable';
import { ZipEnumerable } from '../../enumerables/ZipEnumerable';
import { ZipElement } from '../../models/ZipElement';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results. */
        zip<TSecond, TResult = ZipElement<T, TSecond>>(
            second: Iterable<TSecond>,
            resultSelector?: (first: T, second: TSecond, index: number) => TResult
        ): Enumerable<TResult>;
    }
}

function zip<T, TSecond, TResult = ZipElement<T, TSecond>>(
    this: Enumerable<T>,
    second: Iterable<TSecond>,
    resultSelector?: (first: T, second: TSecond, index: number) => TResult
): Enumerable<TResult> {
    const selector = resultSelector ?? ((f, s) => new ZipElement(f, s));
    // @ts-ignore
    return new ZipEnumerable(this, second, selector);
}

Enumerable.prototype.zip = zip;
