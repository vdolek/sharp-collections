import { Enumerable } from '../../../collections/Enumerable';
import { ReadOnlyList } from '../../../collections/ReadOnlyList';

declare module '../../../collections/ReadOnlyList' {
    namespace ReadOnlyList {
        /** Generates an ReadOnlyList sequence of integral numbers within a specified range. */
        function range(count: number): ReadOnlyList<number>;
        /** Generates an ReadOnlyList sequence of integral numbers within a specified range. */
        function range(start: number, count: number): ReadOnlyList<number>;
        /** Generates an ReadOnlyList sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): ReadOnlyList<number>;
    }
}

function range(a: number, b?: number, c?: number): ReadOnlyList<number> {
    return Enumerable.range(a, b as number, c as number).toReadOnlyList();
}

ReadOnlyList.range = range;
