import { Enumerable } from '../../../collections/Enumerable';
import { HashSet } from '../../../collections/HashSet';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Generates an HashSet sequence of integral numbers within a specified range. */
        function range(count: number): HashSet<number>;
        /** Generates an HashSet sequence of integral numbers within a specified range. */
        function range(start: number, count: number): HashSet<number>;
        /** Generates an HashSet sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): HashSet<number>;
    }
}

function range(a: number, b?: number, c?: number): HashSet<number> {
    return Enumerable.range(a, b as number, c as number).toHashSet();
}

HashSet.range = range;
