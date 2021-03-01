import { LinkedList } from '../../../collections/LinkedList';

declare module '../../../collections/List' {
    namespace LinkedList {
        /** Returns an LinkedList sequence containing exactly one value. */
        function single<T>(element: T): LinkedList<T>;
    }
}

function single<T>(element: T): LinkedList<T> {
    return LinkedList.fromRest(element);
}

LinkedList.single = single;
