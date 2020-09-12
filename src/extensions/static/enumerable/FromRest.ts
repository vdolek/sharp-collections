import { Enumerable } from '../../../collections/Enumerable';
import { ArrayEnumerable } from '../../../enumerables/ArrayEnumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Returns an enumerable from parameters. */
        function fromRest<T>(...elements: T[]): Enumerable<T>;
    }
}

function fromRest<T>(...elements: T[]): Enumerable<T> {
    return new ArrayEnumerable(elements);
}

Enumerable.fromRest = fromRest;
