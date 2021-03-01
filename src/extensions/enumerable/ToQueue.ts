import { Enumerable } from '../../collections/Enumerable';
import { Queue } from '../../collections/Queue';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Converts sequence to a Queue. */
        toQueue(): Queue<T>;
    }
}

function toQueue<T>(this: Enumerable<T>): Queue<T> {
    return new Queue(this);
}

Enumerable.prototype.toQueue = toQueue;
