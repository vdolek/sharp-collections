import { ReadOnlyLinkedList } from '../../../collections/ReadOnlyLinkedList';

declare module '../../../collections/ReadOnlyList' {
    namespace ReadOnlyLinkedList {
        /** Returns an ReadOnlyLinkedList sequence containing exactly one value. */
        function single<T>(element: T): ReadOnlyLinkedList<T>;
    }
}

function single<T>(element: T): ReadOnlyLinkedList<T> {
    return ReadOnlyLinkedList.fromRest(element);
}

ReadOnlyLinkedList.single = single;
