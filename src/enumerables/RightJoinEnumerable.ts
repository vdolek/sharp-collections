import { Enumerable } from '../collections/Enumerable';
import { JoinElement } from '../collections/models/JoinElement';
import { RightJoinElement } from '../collections/models/RightJoinElement';

export class RightJoinEnumerable<TLeft, TRight, TKey, TResult = RightJoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft | undefined, right: TRight) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const leftEnumerable = Enumerable.from(this.leftSource);
        const leftLookup = leftEnumerable.toLookup(this.leftKeySelector);

        const selector = this.resultSelector ?? ((left, right) => new RightJoinElement(left, right) as unknown as TResult);

        let index = 0;
        for (const right of this.rightSource) {
            const key = this.rightKeySelector(right, index++);
            const leftGroup = leftLookup.getOrDefault(key);
            if (leftGroup == null) {
                yield selector(undefined, right);
                continue;
            }

            for (const left of leftGroup) {
                yield selector(left, right);
            }
        }
    }
}
