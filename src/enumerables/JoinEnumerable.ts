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
        const selector = this.resultSelector ?? ((left, right) => new JoinElement(left, right) as unknown as TResult);

        const leftEnumerable = new IteratorEnumerable(this.leftSource[Symbol.iterator]());
        const rightEnumerable = new IteratorEnumerable(this.rightSource[Symbol.iterator]());

        const leftLookup = leftEnumerable.toLookup(this.leftKeySelector);
        if (leftLookup.empty()) {
            return;
        }

        const rightLookup = rightEnumerable.toLookup(this.rightKeySelector);

        for (const leftGroup of leftLookup) {
            const rightGroup = rightLookup.getOrNull(leftGroup.key);
            if (rightGroup == null) {
                continue;
            }

            for (const left of leftGroup) {
                for (const right of rightGroup) {
                    yield selector(left, right);
                }
            }
        }
    }
}
