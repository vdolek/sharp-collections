import { Enumerable } from '../../../collections/Enumerable';
import { LinkedList } from '../../../collections/LinkedList';

declare module '../../../collections/LinkedList' {
    /** Generates an LinkedList sequence that contains one repeated value. */
    namespace LinkedList {
        function repeat<T>(element: T, count: number): LinkedList<T>;
    }
}

function repeat<T>(element: T, count: number): LinkedList<T> {
    return Enumerable.repeat(element, count).toLinkedList();
}

LinkedList.repeat = repeat;
