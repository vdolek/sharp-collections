import { Enumerable } from '../../../collections/Enumerable';
import { RangeEnumerable } from '../../../enumerables/RangeEnumerable';

declare module '../../../collections/Enumerable' {
    namespace Enumerable {
        /** Generates an Enumerable sequence of integral numbers within a specified range. */
        function range(count: number): Enumerable<number>;
        /** Generates an Enumerable sequence of integral numbers within a specified range. */
        function range(start: number, count: number): Enumerable<number>;
        /** Generates an Enumerable sequence of integral numbers within a specified range. */
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
