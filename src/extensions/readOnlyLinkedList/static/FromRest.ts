import { ReadOnlyLinkedList } from '../../../collections/ReadOnlyLinkedList';

declare module '../../../collections/ReadOnlyLinkedList' {
    namespace ReadOnlyLinkedList {
        /** Returns an ReadOnlyLinkedList from rest parameters. */
        function fromRest<T>(...elements: T[]): ReadOnlyLinkedList<T>;
    }
}

function fromRest<T>(...elements: T[]): ReadOnlyLinkedList<T> {
    return new ReadOnlyLinkedList(elements);
}

ReadOnlyLinkedList.fromRest = fromRest;
