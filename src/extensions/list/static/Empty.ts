import { List } from '../../../collections/List';

declare module '../../../collections/List' {
    namespace List {
        /** Returns an empty List. */
        function empty<T>(): List<T>;
    }
}

function empty<T>(): List<T> {
    return new List<T>();
}

List.empty = empty;
