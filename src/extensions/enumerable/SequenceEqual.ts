import { Enumerable } from '../../collections/Enumerable';
import { EqualityComparer } from '../../comparers/EqualityComparer';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Determines whether two sequences are equal by comparing the elements. */
        sequenceEqual(secondSource: Enumerable<T>, comparer?: EqualityComparer<T>): boolean;
    }
}

function sequenceEqual<T>(this: Enumerable<T>, secondSource: Enumerable<T>, comparer?: EqualityComparer<T>): boolean {
    const cmp = comparer ?? EqualityComparer.getDefault<T>();

    const iterator1 = this[Symbol.iterator]();
    const iterator2 = secondSource[Symbol.iterator]();

    let i1 = iterator1.next();
    let i2 = iterator2.next();
    for (; i1.done !== true && i2.done !== true; i1 = iterator1.next(), i2 = iterator2.next()) {
        if (!cmp.equals(i1.value, i2.value)) {
            return false;
        }
    }

    if (i1.done !== true || i2.done !== true) {
        return false;
    }

    return true;
}

Enumerable.prototype.sequenceEqual = sequenceEqual;
