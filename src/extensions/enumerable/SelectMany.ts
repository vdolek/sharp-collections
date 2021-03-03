import { Enumerable } from '../../collections/Enumerable';
import { SelectManyEnumerable } from '../../enumerables/SelectManyEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Projects each element of a sequence and flattens the resulting sequences into one sequence. */
        selectMany<TResult>(selector: (x: T) => Iterable<TResult>): Enumerable<TResult>;
    }
}

function selectMany<T, TResult>(this: Enumerable<T>, selector: (x: T) => Iterable<TResult>): Enumerable<TResult> {
    return new SelectManyEnumerable(this, selector);
}

Enumerable.prototype.selectMany = selectMany;
