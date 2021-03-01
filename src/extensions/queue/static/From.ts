import { Queue } from '../../../collections/Queue';

declare module '../../../collections/Queue' {
    namespace Queue {
        /** Returns an Queue from source. */
        function from<T>(source: Iterable<T>): Queue<T>;
    }
}

function from<T>(source: Iterable<T>): Queue<T> {
    return new Queue(source);
}

Queue.from = from;
