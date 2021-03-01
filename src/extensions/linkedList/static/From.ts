import { LinkedList } from '../../../collections/LinkedList';

declare module '../../../collections/LinkedList' {
    namespace LinkedList {
        /** Returns an LinkedList from source. */
        function from<T>(source: Iterable<T>): LinkedList<T>;
    }
}

function from<T>(source: Iterable<T>): LinkedList<T> {
    return new LinkedList(source);
}

LinkedList.from = from;
