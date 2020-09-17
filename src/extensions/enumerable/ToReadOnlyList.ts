import { Enumerable } from '../../collections/Enumerable';
import { ReadOnlyList } from '../../collections/ReadOnlyList';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyList. */
        toReadOnlyList(): ReadOnlyList<T>;
    }
}

function toReadOnlyList<T>(this: Enumerable<T>): ReadOnlyList<T> {
    return new ReadOnlyList(this);
}

Enumerable.prototype.toReadOnlyList = toReadOnlyList;
