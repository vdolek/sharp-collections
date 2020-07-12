import { Enumerable, OuterJoinElement } from '@src/Internal';

export class OuterJoinEnumerable<TLeft, TRight, TKey, TResult = OuterJoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft | null, right: TRight | null) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const leftEnumerable = Enumerable.from(this.leftSource);
        const rightEnumerable = Enumerable.from(this.rightSource);

        const leftLookup = leftEnumerable.toLookup(this.leftKeySelector);
        const rightLookup = rightEnumerable.toLookup(this.rightKeySelector);

        const selector = this.resultSelector ?? ((left, right) => new OuterJoinElement(left, right) as unknown as TResult);

        for (const leftGroup of leftLookup) {
            const rightGroup = rightLookup.getOrNull(leftGroup.key);

            for (const left of leftGroup) {
                if (rightGroup != null) {
                    for (const right of rightGroup) {
                        yield selector(left, right);
                    }
                } else {
                    yield selector(left, null);
                }
            }
        }

        // for (const leftGroup of leftLookup) {
        //     const rightGroup = rightLookup.getOrNull(leftGroup.key);
        //     if (rightGroup == null) {
        //         for (const left of leftGroup) {
        //             yield selector(left, null);
        //         }
        //         continue;
        //     }
        //
        //     for (const left of leftGroup) {
        //         for (const right of rightGroup) {
        //             yield selector(left, right);
        //         }
        //     }
        // }

        for (const rightGroup of rightLookup) {
            if (!leftLookup.containsKey(rightGroup.key)) {
                for (const right of rightGroup) {
                    yield selector(null, right);
                }
            }
        }
    }
}
