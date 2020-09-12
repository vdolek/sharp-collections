import { Enumerable } from '../../../collections/Enumerable';
import { RepeatEnumerable } from '../../../enumerables/RepeatEnumerable';

declare module '../../../collections/Enumerable' {
    /** Generates a sequence that contains one repeated value. */
    namespace Enumerable {
        function repeat<T>(element: T, count: number): Enumerable<T>;
    }
}

function repeat<T>(element: T, count: number): Enumerable<T> {
    return new RepeatEnumerable(element, count);
}

Enumerable.repeat = repeat;
