import { Enumerable } from '../../../collections/Enumerable';
import { ArrayEnumerable } from '../../../enumerables/ArrayEnumerable';
import { IterableEnumerable } from '../../../enumerables/IterableEnumerable';
import { RangeEnumerable } from '../../../enumerables/RangeEnumerable';
import { SetEnumerable } from '../../../enumerables/SetEnumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Generates a sequence of integral numbers within a specified range. */
        function range(count: number): Enumerable<number>;
        /** Generates a sequence of integral numbers within a specified range. */
        function range(start: number, count: number): Enumerable<number>;
        /** Generates a sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): Enumerable<number>;
    }
}

function range(a: number, b?: number, c?: number): Enumerable<number> {
    const start = b == null ? 0 : a;
    const count = b == null ? a : b;
    const increment = c ?? 1;

    return new RangeEnumerable(start, count, increment);
}

Enumerable.range = range;
