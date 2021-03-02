import { Enumerable } from '../../collections/Enumerable';
import { Grouping } from '../../collections/Grouping';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { GroupByEnumerable } from '../../enumerables/GroupByEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. */
        groupBy<TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
            keyEqualityComparer: EqualityComparer<TKey>,
            keySelector: (x: T, index: number) => TKey,
            elementSelector?: (value: T, index: number) => TElement,
            resultSelector?: (key: TKey, group: Enumerable<TElement>) => TResult
        ): Enumerable<TResult>;

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
    a: EqualityComparer<TKey> | ((x: T, index: number) => TKey),
    b: (x: T, index: number) => TKey | ((value: T, index: number) => TElement),
    c: (value: T, index: number) => TElement | ((key: TKey, group: Enumerable<TElement>) => TResult),
    d: (key: TKey, group: Enumerable<TElement>) => TResult
): Enumerable<TResult> {
    let keyEqualityComparer: EqualityComparer<TKey> | undefined;
    let keySelector: (x: T, index: number) => TKey;
    let elementSelector: (value: T, index: number) => TElement;
    let resultSelector: (key: TKey, group: Enumerable<TElement>) => TResult;

    if (a instanceof EqualityComparer) {
        keyEqualityComparer = a;
        keySelector = b as (x: T, index: number) => TKey;
        elementSelector = c as (value: T, index: number) => TElement;
        resultSelector = d;
    } else {
        keyEqualityComparer = undefined;
        keySelector = a;
        elementSelector = b as unknown as (value: T, index: number) => TElement;
        resultSelector = c as unknown as (key: TKey, group: Enumerable<TElement>) => TResult;
    }

    return new GroupByEnumerable(this, keySelector, keyEqualityComparer, elementSelector, resultSelector);
}

Enumerable.prototype.groupBy = groupBy;
