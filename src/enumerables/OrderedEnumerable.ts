import { Comparer, Enumerable } from '../internal';

export abstract class OrderedEnumerable<T> extends Enumerable<T> {
    /**  Performs a subsequent ordering of the elements in a sequence according to a key. */
    public abstract thenBy<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>, descending?: boolean): OrderedEnumerable<T>;

    /**  Performs a subsequent ordering of the elements in a sequence in descending order according to a key. */
    public abstract thenByDescending<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>): OrderedEnumerable<T>;
}
