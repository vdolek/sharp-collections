import { Enumerable } from '../../../collections/Enumerable';
import { ArrayEnumerable } from '../../../enumerables/ArrayEnumerable';
import { IterableEnumerable } from '../../../enumerables/IterableEnumerable';
import { SetEnumerable } from '../../../enumerables/SetEnumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Returns a sequence containing exactly one value. */
        function single<T>(element: T): Enumerable<T>;
    }
}

function single<T>(element: T): Enumerable<T> {
    return Enumerable.fromRest(element);
}

// @ts-ignore
Enumerable.single = single;
