import { Queue } from '../../../collections/Queue';

declare module '../../../collections/Queue' {
    namespace Queue {
        /** Returns an empty Queue. */
        function empty<T>(): Queue<T>;
    }
}

function empty<T>(): Queue<T> {
    return new Queue<T>();
}

Queue.empty = empty;
