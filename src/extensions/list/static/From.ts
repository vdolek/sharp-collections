import { List } from '../../../collections/List';

declare module '../../../collections/List' {
    namespace List {
        /** Returns an List from source. */
        function from<T>(source: Iterable<T>): List<T>;
    }
}

function from<T>(source: Iterable<T>): List<T> {
    return new List(source);
}

List.from = from;
