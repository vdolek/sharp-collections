import { LinkedList } from '../../../collections/LinkedList';

declare module '../../../collections/LinkedList' {
    namespace LinkedList {
        /** Returns an empty LinkedList. */
        function empty<T>(): LinkedList<T>;
    }
}

function empty<T>(): LinkedList<T> {
    return new LinkedList<T>();
}

LinkedList.empty = empty;
