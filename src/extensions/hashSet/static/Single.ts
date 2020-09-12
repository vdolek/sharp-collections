import { HashSet } from '../../../collections/HashSet';

declare module '../../../collections/HashSet' {
    namespace HashSet {
        /** Returns an HashSet sequence containing exactly one value. */
        function single<T>(element: T): HashSet<T>;
    }
}

function single<T>(element: T): HashSet<T> {
    return HashSet.fromRest(element);
}

HashSet.single = single;
