import { Comparer, Enumerable } from '../internal';

export abstract class OrderedEnumerable<T> extends Enumerable<T> {
    public abstract thenBy<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>, descending?: boolean): OrderedEnumerable<T>;

    public abstract thenByDescending<TInnerKey>(keySelector: (element: T) => TInnerKey, comparer?: Comparer<TInnerKey>): OrderedEnumerable<T>;
}
