import { Enumerable } from '../../../collections/Enumerable';
import { Stack } from '../../../collections/Stack';

declare module '../../../collections/Stack' {
    namespace Stack {
        /** Generates an Stack sequence of integral numbers within a specified range. */
        function range(count: number): Stack<number>;
        /** Generates an Stack sequence of integral numbers within a specified range. */
        function range(start: number, count: number): Stack<number>;
        /** Generates an Stack sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): Stack<number>;
    }
}

function range(a: number, b?: number, c?: number): Stack<number> {
    // @ts-ignore
    return Enumerable.range(a, b, c).toStack();
}

Stack.range = range;
