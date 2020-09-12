import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyHashSet } from '../../../collections/ReadOnlyHashSet';

declare module '../../../collections/ReadOnlyHashSet' {
    namespace ReadOnlyHashSet {
        /** Generates an ReadOnlyHashSet sequence of integral numbers within a specified range. */
        function range(count: number): ReadOnlyHashSet<number>;
        /** Generates an ReadOnlyHashSet sequence of integral numbers within a specified range. */
        function range(start: number, count: number): ReadOnlyHashSet<number>;
        /** Generates an ReadOnlyHashSet sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): ReadOnlyHashSet<number>;
    }
}

function range(a: number, b?: number, c?: number): ReadOnlyHashSet<number> {
    // @ts-ignore
    return Enumerable.range(a, b, c).toReadOnlyHashSet();
}

ReadOnlyHashSet.range = range;
