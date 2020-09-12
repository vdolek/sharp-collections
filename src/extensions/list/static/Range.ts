import { Enumerable } from '../../../collections/Enumerable';
import { List } from '../../../collections/List';

declare module '../../../collections/List' {
    namespace List {
        /** Generates an List sequence of integral numbers within a specified range. */
        function range(count: number): List<number>;
        /** Generates an List sequence of integral numbers within a specified range. */
        function range(start: number, count: number): List<number>;
        /** Generates an List sequence of integral numbers within a specified range. */
        function range(start: number, count: number, increment: number): List<number>;
    }
}

function range(a: number, b?: number, c?: number): List<number> {
    // @ts-ignore
    return Enumerable.range(a, b, c).toList();
}

List.range = range;
