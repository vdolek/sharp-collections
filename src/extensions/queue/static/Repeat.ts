import { Enumerable } from '../../../collections/Enumerable';
import { Queue } from '../../../collections/Queue';

declare module '../../../collections/Queue' {
    /** Generates an Queue sequence that contains one repeated value. */
    namespace Queue {
        function repeat<T>(element: T, count: number): Queue<T>;
    }
}

function repeat<T>(element: T, count: number): Queue<T> {
    return Enumerable.repeat(element, count).toQueue();
}

Queue.repeat = repeat;
