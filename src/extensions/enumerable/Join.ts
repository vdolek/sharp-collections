import { Enumerable } from '../../collections/Enumerable';
import { JoinElement } from '../../collections/models/JoinElement';
import { JoinEnumerable } from '../../enumerables/JoinEnumerable';

declare module '../../collections/Enumerable' {
    interface Enumerable<T> {
        /** Correlates the elements of two sequences based on matching keys. */
        join<TRight, TKey, TResult = JoinElement<T, TRight>>(
            this: Enumerable<T>,
            rightSource: Iterable<TRight>,
            leftKeySelector: (value: T, index: number) => TKey,
            rightKeySelector: (value: TRight, index: number) => TKey,
            resultSelector?: (left: T, right: TRight) => TResult
        ): Enumerable<TResult>;
    }
}

function join<T, TRight, TKey, TResult = JoinElement<T, TRight>>(
    this: Enumerable<T>,
    rightSource: Iterable<TRight>,
    leftKeySelector: (value: T, index: number) => TKey,
    rightKeySelector: (value: TRight, index: number) => TKey,
    resultSelector?: (left: T, right: TRight) => TResult
): Enumerable<TResult> {
    return new JoinEnumerable(this, rightSource, leftKeySelector, rightKeySelector, resultSelector);
}

Enumerable.prototype.join = join;
