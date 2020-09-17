import { Enumerable } from '../../../collections/Enumerable';
import { ArrayEnumerable } from '../../../enumerables/ArrayEnumerable';
import { IterableEnumerable } from '../../../enumerables/IterableEnumerable';
import { SetEnumerable } from '../../../enumerables/SetEnumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Returns an Enumerable from source. */
        function from<T>(source: Iterable<T>): Enumerable<T>;
    }
}

function from<T>(source: Iterable<T>): Enumerable<T> {
    if (Array.isArray(source)) {
        return new ArrayEnumerable(source);
    }

    if (source instanceof Set) {
        return new SetEnumerable(source);
    }

    return new IterableEnumerable(source);
}

Enumerable.from = from;
