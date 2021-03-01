import { LinkedList } from '../../../collections/LinkedList';

declare module '../../../collections/LinkedList' {
    namespace LinkedList {
        /** Returns an LinkedList from rest parameters. */
        function fromRest<T>(...elements: T[]): LinkedList<T>;
    }
}

function fromRest<T>(...elements: T[]): LinkedList<T> {
    return new LinkedList(elements);
}

LinkedList.fromRest = fromRest;
