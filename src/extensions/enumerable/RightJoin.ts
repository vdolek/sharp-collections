import { Enumerable } from '../../collections/Enumerable';
import { RightJoinEnumerable } from '../../enumerables/RightJoinEnumerable';
import { RightJoinElement } from '../../models/RightJoinElement';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Performs a right outer join on two homogeneous sequences. */
        rightJoin<TRight, TKey, TResult = RightJoinElement<T, TRight>>(
            rightSource: Iterable<TRight>,
            leftKeySelector: (value: T, index: number) => TKey,
            rightKeySelector: (value: TRight, index: number) => TKey,
            resultSelector?: (left: T | undefined, right: TRight) => TResult
        ): Enumerable<TResult>;
    }
}

function rightJoin<T, TRight, TKey, TResult = RightJoinElement<T, TRight>>(
    this: Enumerable<T>,
    rightSource: Iterable<TRight>,
    leftKeySelector: (value: T, index: number) => TKey,
    rightKeySelector: (value: TRight, index: number) => TKey,
    resultSelector?: (left: T | undefined, right: TRight) => TResult
): Enumerable<TResult> {
    return new RightJoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
}

Enumerable.prototype.rightJoin = rightJoin;
