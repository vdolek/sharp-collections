import { Enumerable } from '../../../collections/Enumerable';
import { Stack } from '../../../collections/Stack';

declare module '../../../collections/Stack' {
    /** Generates an Stack sequence that contains one repeated value. */
    namespace Stack {
        function repeat<T>(element: T, count: number): Stack<T>;
    }
}

function repeat<T>(element: T, count: number): Stack<T> {
    return Enumerable.repeat(element, count).toStack();
}

Stack.repeat = repeat;
