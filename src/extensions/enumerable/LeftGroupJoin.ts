import { Enumerable } from '../../collections/Enumerable';
import { LeftGroupJoinElement } from '../../collections/models/LeftGroupJoinElement';
import { ReadOnlyList } from '../../collections/ReadOnlyList';
import { LeftGroupJoinEnumerable } from '../../enumerables/LeftGroupJoinEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Correlates the elements of two sequences based on equality of keys and groups the results. */
        leftGroupJoin<TRight, TKey, TResult = LeftGroupJoinElement<T, TRight>>(
            rightSource: Iterable<TRight>,
            leftKeySelector: (value: T, index: number) => TKey,
            rightKeySelector: (value: TRight, index: number) => TKey,
            resultSelector?: (left: T, rightList: ReadOnlyList<TRight> | undefined) => TResult
        ): Enumerable<TResult>;
    }
}

function leftGroupJoin<T, TRight, TKey, TResult = LeftGroupJoinElement<T, TRight>>(
    this: Enumerable<T>,
    rightSource: Iterable<TRight>,
    leftKeySelector: (value: T, index: number) => TKey,
    rightKeySelector: (value: TRight, index: number) => TKey,
    resultSelector?: (left: T, rightList: ReadOnlyList<TRight> | undefined) => TResult
): Enumerable<TResult> {
    return new LeftGroupJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
}

Enumerable.prototype.leftGroupJoin = leftGroupJoin;
