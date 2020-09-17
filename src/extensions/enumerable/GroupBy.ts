import { Enumerable } from '../../collections/Enumerable';
import { Grouping } from '../../collections/Grouping';
import { GroupByEnumerable } from '../../enumerables/GroupByEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. */
        groupBy<TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
            keySelector: (x: T, index: number) => TKey,
            elementSelector?: (value: T, index: number) => TElement,
            resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult
        ): Enumerable<TResult>;
    }
}

function groupBy<T, TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
    this: Enumerable<T>,
    keySelector: (x: T, index: number) => TKey,
    elementSelector?: (value: T, index: number) => TElement,
    resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult
): Enumerable<TResult> {
    return new GroupByEnumerable(this, keySelector, elementSelector, resultSelector);
}

Enumerable.prototype.groupBy = groupBy;
