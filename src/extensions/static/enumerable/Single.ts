import { Enumerable } from '../../../collections/Enumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Returns an Enumerable sequence containing exactly one value. */
        function single<T>(element: T): Enumerable<T>;
    }
}

function single<T>(element: T): Enumerable<T> {
    return Enumerable.fromRest(element); // TODO SingleEnumerable
}

Enumerable.single = single;
