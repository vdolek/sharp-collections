import { Enumerable } from '../../../collections/Enumerable';
import { Queue } from '../../../collections/Queue';

declare module '../../../collections/Queue' {
    namespace Queue {
        /** Generates an Queue sequence of integral numbers within a specified range. */
        function range(count: number): Queue<number>;
        /** Generates an Queue sequence of integral numbers within a specified range. */
        function range(start: number, count: number): Queue<number>;
        /** Generates an Queue sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): Queue<number>;
    }
}

function range(a: number, b?: number, c?: number): Queue<number> {
    return Enumerable.range(a, b as number, c as number).toQueue();
}

Queue.range = range;
