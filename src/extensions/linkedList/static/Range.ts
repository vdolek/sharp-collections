import { Enumerable } from '../../../collections/Enumerable';
import { LinkedList } from '../../../collections/LinkedList';

declare module '../../../collections/LinkedList' {
    namespace LinkedList {
        /** Generates an LinkedList sequence of integral numbers within a specified range. */
        function range(count: number): LinkedList<number>;
        /** Generates an LinkedList sequence of integral numbers within a specified range. */
        function range(start: number, count: number): LinkedList<number>;
        /** Generates an LinkedList sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): LinkedList<number>;
    }
}

function range(a: number, b?: number, c?: number): LinkedList<number> {
    // @ts-ignore
    return Enumerable.range(a, b, c).toLinkedList();
}

LinkedList.range = range;
