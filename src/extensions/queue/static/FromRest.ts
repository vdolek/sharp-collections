import { Queue } from '../../../collections/Queue';

declare module '../../../collections/Queue' {
    namespace Queue {
        /** Returns an Queue from rest parameters. */
        function fromRest<T>(...elements: T[]): Queue<T>;
    }
}

function fromRest<T>(...elements: T[]): Queue<T> {
    return new Queue(elements);
}

Queue.fromRest = fromRest;
