import { Enumerable } from '../../collections/Enumerable';
import { ReadOnlyLinkedList } from '../../collections/ReadOnlyLinkedList';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a ReadOnlyLinkedList. */
        toReadOnlyLinkedList(): ReadOnlyLinkedList<T>;
    }
}

function toReadOnlyLinkedList<T>(this: Enumerable<T>): ReadOnlyLinkedList<T> {
    return new ReadOnlyLinkedList(this);
}

Enumerable.prototype.toReadOnlyLinkedList = toReadOnlyLinkedList;
