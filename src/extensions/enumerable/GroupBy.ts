import { Enumerable } from '../../collections/Enumerable';
import { Grouping } from '../../collections/Grouping';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { GroupByEnumerable } from '../../enumerables/GroupByEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. */
        groupBy<TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
            keySelector: (value: T, index: number) => TKey,
            keyEqualityComparer: EqualityComparer<TKey>,
            elementSelector?: (value: T, index: number) => TElement,
            resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult
        ): Enumerable<TResult>;

        /** Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. */
        groupBy<TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
            keySelector: (value: T, index: number) => TKey,
            elementSelector?: (value: T, index: number) => TElement,
            resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult
        ): Enumerable<TResult>;
    }
}

function groupBy<T, TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
    this: Enumerable<T>,
    keySelector: (value: T, index: number) => TKey,
    a?: EqualityComparer<TKey> | ((value: T, index: number) => TElement),
    b?: ((value: T, index: number) => TElement) | ((key: TKey, group: Enumerable<TElement>) => TResult),
    c?: (key: TKey, group: Enumerable<TElement>) => TResult
): Enumerable<TResult> {
    let keyEqualityComparer: EqualityComparer<TKey> | undefined;
    let elementSelector: ((value: T, index: number) => TElement) | undefined;
    let resultSelector: ((key: TKey, group: Enumerable<TElement>) => TResult) | undefined;

    if (a instanceof EqualityComparer) {
        keyEqualityComparer = a;
        elementSelector = b as (value: T, index: number) => TElement;
        resultSelector = c;
    } else {
        keyEqualityComparer = undefined;
        elementSelector = a as (value: T, index: number) => TElement;
        resultSelector = b as (key: TKey, group: Enumerable<TElement>) => TResult;
    }

    return new GroupByEnumerable(this, keySelector, keyEqualityComparer, elementSelector, resultSelector);
}

Enumerable.prototype.groupBy = groupBy;
