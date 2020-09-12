import { List } from '../../../collections/List';

declare module '../../../collections/List' {
    namespace List {
        /** Returns an List sequence containing exactly one value. */
        function single<T>(element: T): List<T>;
    }
}

function single<T>(element: T): List<T> {
    return List.fromRest(element);
}

List.single = single;
