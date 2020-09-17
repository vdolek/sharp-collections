import { List } from '../../../collections/List';

declare module '../../../collections/List' {
    namespace List {
        /** Returns an List from rest parameters. */
        function fromRest<T>(...elements: T[]): List<T>;
    }
}

function fromRest<T>(...elements: T[]): List<T> {
    return new List(elements);
}

List.fromRest = fromRest;
