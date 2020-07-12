import { Enumerable, IteratorEnumerable, JoinElement } from '@src/Internal';

export class JoinEnumerable<TLeft, TRight, TKey, TResult = JoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft, right: TRight) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const rightEnumerable = new IteratorEnumerable(this.rightSource[Symbol.iterator]());
        const rightLookup = rightEnumerable.toLookup(this.rightKeySelector);

        const selector = this.resultSelector ?? ((left, right) => new JoinElement(left, right) as unknown as TResult);

        let index = 0;
        for (const left of this.leftSource) {
            const key = this.leftKeySelector(left, index++);
            const rightGroup = rightLookup.getOrNull(key);
            if (rightGroup == null) {
                continue;
            }

            for (const right of rightGroup) {
                yield selector(left, right);
            }
        }
    }
}