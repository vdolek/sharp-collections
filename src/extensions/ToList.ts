import { Enumerable } from '../collections/Enumerable';
import { List } from '../collections/List';

declare module '../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a List. */
        toList(): List<T>;
    }
}

function toList<T>(this: Enumerable<T>): List<T> {
    return new List(this);
}

Enumerable.prototype.toList = toList;
