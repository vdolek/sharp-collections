import { Stack } from '../../../collections/Stack';

declare module '../../../collections/Stack' {
    namespace Stack {
        /** Returns an empty Stack. */
        function empty<T>(): Stack<T>;
    }
}

function empty<T>(): Stack<T> {
    return new Stack<T>();
}

Stack.empty = empty;
