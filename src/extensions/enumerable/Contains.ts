import { Enumerable } from '../../collections/Enumerable';
import { EqualityComparer } from '../../comparers/EqualityComparer';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Determines whether a sequence contains a specified element by using an equality comparer. */
        contains(value: T, comparer?: EqualityComparer<T>): boolean;
    }
}

function contains<T>(this: Enumerable<T>, value: T, comparer?: EqualityComparer<T>): boolean {
    const cmp = comparer ?? EqualityComparer.default<T>();
    for (const element of this) {
        if (cmp.equals(value, element)) {
            return true;
        }
    }
    return false;
}

Enumerable.prototype.contains = contains;
