import { Stack } from '../../../collections/Stack';

declare module '../../../collections/Stack' {
    namespace Stack {
        /** Returns an Stack from rest parameters. */
        function fromRest<T>(...elements: T[]): Stack<T>;
    }
}

function fromRest<T>(...elements: T[]): Stack<T> {
    return new Stack(elements);
}

Stack.fromRest = fromRest;
