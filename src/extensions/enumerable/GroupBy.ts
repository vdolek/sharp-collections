import { Enumerable } from '../../collections/Enumerable';
import { Grouping } from '../../collections/Grouping';
import { EqualityComparer } from '../../comparers/EqualityComparer';
import { GroupByEnumerable } from '../../enumerables/GroupByEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. */
        groupBy<TKey, TElement = T, TResult = Grouping<TKey, TElement>>(
            keyEqualityComparer: EqualityComparer<TKey>,
            keySelector: (value: T, index: number) => TKey,
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
    a: EqualityComparer<TKey> | ((value: T, index: number) => TKey),
    b: ((value: T, index: number) => TKey) | ((value: T, index: number) => TElement) | undefined,
    c: ((value: T, index: number) => TElement) | ((key: TKey, group: Enumerable<TElement>) => TResult) | undefined,
    d: ((key: TKey, group: Enumerable<TElement>) => TResult) | undefined
): Enumerable<TResult> {
    let keyEqualityComparer: EqualityComparer<TKey> | undefined;
    let keySelector: (value: T, index: number) => TKey;
    let elementSelector: ((value: T, index: number) => TElement) | undefined;
    let resultSelector: ((key: TKey, group: Enumerable<TElement>) => TResult) | undefined;

    if (a instanceof EqualityComparer) {
        keyEqualityComparer = a;
        keySelector = b as (value: T, index: number) => TKey;
        elementSelector = c as (value: T, index: number) => TElement;
        resultSelector = d;
    } else {
        keyEqualityComparer = undefined;
        keySelector = a;
        elementSelector = b as (value: T, index: number) => TElement;
        resultSelector = c as (key: TKey, group: Enumerable<TElement>) => TResult;
    }

    return new GroupByEnumerable(keyEqualityComparer, this, keySelector, elementSelector, resultSelector);
}

// @ts-ignore
Enumerable.prototype.groupBy = groupBy;
