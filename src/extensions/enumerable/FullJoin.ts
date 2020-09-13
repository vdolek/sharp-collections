import { Enumerable } from '../../collections/Enumerable';
import { FullJoinEnumerable } from '../../enumerables/FullJoinEnumerable';
import { FullJoinElement } from '../../models/FullJoinElement';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Performs a full outer join on two homogeneous sequences. */
        fullJoin<TRight, TKey, TResult = FullJoinElement<T, TRight>>(
            rightSource: Iterable<TRight>,
            leftKeySelector: (value: T, index: number) => TKey,
            rightKeySelector: (value: TRight, index: number) => TKey,
            resultSelector?: (left: T | undefined, right: TRight | undefined) => TResult
        ): Enumerable<TResult>;
    }
}

function fullJoin<T, TRight, TKey, TResult = FullJoinElement<T, TRight>>(
    this: Enumerable<T>,
    rightSource: Iterable<TRight>,
    leftKeySelector: (value: T, index: number) => TKey,
    rightKeySelector: (value: TRight, index: number) => TKey,
    resultSelector?: (left: T | undefined, right: TRight | undefined) => TResult
): Enumerable<TResult> {
    return new FullJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
}

Enumerable.prototype.fullJoin = fullJoin;
