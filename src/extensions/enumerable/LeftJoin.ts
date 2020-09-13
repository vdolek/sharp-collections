import { Enumerable } from '../../collections/Enumerable';
import { LeftJoinEnumerable } from '../../enumerables/LeftJoinEnumerable';
import { LeftJoinElement } from '../../models/LeftJoinElement';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Performs a left outer join on two homogeneous sequences. */
        leftJoin<TRight, TKey, TResult = LeftJoinElement<T, TRight>>(
            rightSource: Iterable<TRight>,
            leftKeySelector: (value: T, index: number) => TKey,
            rightKeySelector: (value: TRight, index: number) => TKey,
            resultSelector?: (left: T, right: TRight | undefined) => TResult
        ): Enumerable<TResult>;
    }
}

function leftJoin<T, TRight, TKey, TResult = LeftJoinElement<T, TRight>>(
    this: Enumerable<T>,
    rightSource: Iterable<TRight>,
    leftKeySelector: (value: T, index: number) => TKey,
    rightKeySelector: (value: TRight, index: number) => TKey,
    resultSelector?: (left: T, right: TRight | undefined) => TResult
): Enumerable<TResult> {
    return new LeftJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
}

Enumerable.prototype.leftJoin = leftJoin;
