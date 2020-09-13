import { Enumerable } from '../../collections/Enumerable';
import { GroupJoinElement } from '../../models/GroupJoinElement';
import { ReadOnlyList } from '../../collections/ReadOnlyList';
import { GroupJoinEnumerable } from '../../enumerables/GroupJoinEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Correlates the elements of two sequences based on equality of keys and groups the results. */
        groupJoin<TRight, TKey, TResult = GroupJoinElement<T, TRight>>(
            rightSource: Iterable<TRight>,
            leftKeySelector: (value: T, index: number) => TKey,
            rightKeySelector: (value: TRight, index: number) => TKey,
            resultSelector?: (left: T, rightList: ReadOnlyList<TRight>) => TResult
        ): Enumerable<TResult>;
    }
}

function groupJoin<T, TRight, TKey, TResult = GroupJoinElement<T, TRight>>(
    this: Enumerable<T>,
    rightSource: Iterable<TRight>,
    leftKeySelector: (value: T, index: number) => TKey,
    rightKeySelector: (value: TRight, index: number) => TKey,
    resultSelector?: (left: T, rightList: ReadOnlyList<TRight>) => TResult
): Enumerable<TResult> {
    return new GroupJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
}

Enumerable.prototype.groupJoin = groupJoin;
