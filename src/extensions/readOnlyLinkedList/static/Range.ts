import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyLinkedList } from '../../../collections/ReadOnlyLinkedList';

declare module '../../../collections/ReadOnlyLinkedList' {
    namespace ReadOnlyLinkedList {
        /** Generates an ReadOnlyLinkedList sequence of integral numbers within a specified range. */
        function range(count: number): ReadOnlyLinkedList<number>;
        /** Generates an ReadOnlyLinkedList sequence of integral numbers within a specified range. */
        function range(start: number, count: number): ReadOnlyLinkedList<number>;
        /** Generates an ReadOnlyLinkedList sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): ReadOnlyLinkedList<number>;
    }
}

function range(a: number, b?: number, c?: number): ReadOnlyLinkedList<number> {
    // @ts-ignore
    return Enumerable.range(a, b, c).toReadOnlyLinkedList();
}

ReadOnlyLinkedList.range = range;
