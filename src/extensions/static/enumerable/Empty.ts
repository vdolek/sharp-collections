import { Enumerable } from '../../../collections/Enumerable';
import { EmptyEnumerable } from '../../../enumerables/EmptyEnumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Returns an empty Enumerable. */
        function empty<T>(): Enumerable<T>;
    }
}

function empty<T>(): Enumerable<T> {
    return new EmptyEnumerable();
}

Enumerable.empty = empty;
