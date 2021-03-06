import { Enumerable } from '../collections/Enumerable';
import { JoinElement } from '../models/JoinElement';
import { LeftJoinElement } from '../models/LeftJoinElement';

export class LeftJoinEnumerable<TLeft, TRight, TKey, TResult = LeftJoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft, right: TRight | undefined) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const rightEnumerable = Enumerable.from(this.rightSource);
        const rightLookup = rightEnumerable.toLookup(this.rightKeySelector);

        const selector = this.resultSelector ?? ((left, right) => new JoinElement(left, right) as unknown as TResult);

        let index = 0;
        for (const left of this.leftSource) {
            const key = this.leftKeySelector(left, index++);
            const rightGroup = rightLookup.getOrDefault(key);
            if (rightGroup == null) {
                yield selector(left, undefined);
                continue;
            }

            for (const right of rightGroup) {
                yield selector(left, right);
            }
        }
    }
}
