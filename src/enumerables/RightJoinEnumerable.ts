import { Enumerable, JoinElement, RightJoinElement } from '@sharp-collections';

export class RightJoinEnumerable<TLeft, TRight, TKey, TResult = RightJoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft | null, right: TRight) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const leftEnumerable = Enumerable.from(this.leftSource);
        const leftLookup = leftEnumerable.toLookup(this.leftKeySelector);

        const selector = this.resultSelector ?? ((left, right) => new JoinElement(left, right) as unknown as TResult);

        let index = 0;
        for (const right of this.rightSource) {
            const key = this.rightKeySelector(right, index++);
            const leftGroup = leftLookup.getOrNull(key);
            if (leftGroup == null) {
                yield selector(null, right);
                continue;
            }

            for (const left of leftGroup) {
                yield selector(left, right);
            }
        }
    }
}
