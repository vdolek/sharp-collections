import { Queue } from '../../../collections/Queue';

declare module '../../../collections/Queue' {
    namespace Queue {
        /** Returns an Queue sequence containing exactly one value. */
        function single<T>(element: T): Queue<T>;
    }
}

function single<T>(element: T): Queue<T> {
    return Queue.fromRest(element);
}

Queue.single = single;
