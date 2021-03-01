import { Stack } from '../../../collections/Stack';

declare module '../../../collections/Stack' {
    namespace Stack {
        /** Returns an Stack from source. */
        function from<T>(source: Iterable<T>): Stack<T>;
    }
}

function from<T>(source: Iterable<T>): Stack<T> {
    return new Stack(source);
}

Stack.from = from;
