import { Enumerable } from '../../collections/Enumerable';
import { LinkedList } from '../../collections/LinkedList';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a LinkedList. */
        toLinkedList(): LinkedList<T>;
    }
}

function toLinkedList<T>(this: Enumerable<T>): LinkedList<T> {
    return new LinkedList(this);
}

Enumerable.prototype.toLinkedList = toLinkedList;
