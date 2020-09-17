import { Enumerable } from '../../collections/Enumerable';
import { SelectEnumerable } from '../../enumerables/SelectEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Projects each element of a sequence into a new form. */
        select<TResult>(selector: (x: T, index: number) => TResult): Enumerable<TResult>;
    }
}

function select<T, TResult>(this: Enumerable<T>, selector: (x: T, index: number) => TResult): Enumerable<TResult> {
    return new SelectEnumerable(this, selector);
}

Enumerable.prototype.select = select;
