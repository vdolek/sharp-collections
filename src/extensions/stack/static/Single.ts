import { Stack } from '../../../collections/Stack';

declare module '../../../collections/Stack' {
    namespace Stack {
        /** Returns an Stack sequence containing exactly one value. */
        function single<T>(element: T): Stack<T>;
    }
}

function single<T>(element: T): Stack<T> {
    return Stack.fromRest(element);
}

Stack.single = single;
