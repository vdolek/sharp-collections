import { Enumerable } from '../../../collections/Enumerable';
import { List } from '../../../collections/List';

declare module '../../../collections/List' {
    /** Generates an List sequence that contains one repeated value. */
    namespace List {
        function repeat<T>(element: T, count: number): List<T>;
    }
}

function repeat<T>(element: T, count: number): List<T> {
    return Enumerable.repeat(element, count).toList();
}

List.repeat = repeat;
