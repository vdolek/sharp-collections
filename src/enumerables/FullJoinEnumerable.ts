import { Enumerable } from '../collections/Enumerable';
import { FullJoinElement } from '../models/FullJoinElement';

export class FullJoinEnumerable<TLeft, TRight, TKey, TResult = FullJoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft | undefined, right: TRight | undefined) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const leftEnumerable = Enumerable.from(this.leftSource);
        const rightEnumerable = Enumerable.from(this.rightSource);

        const leftLookup = leftEnumerable.toLookup(this.leftKeySelector);
        const rightLookup = rightEnumerable.toLookup(this.rightKeySelector);

        const selector = this.resultSelector ?? ((left, right) => new FullJoinElement(left, right) as unknown as TResult);

        for (const leftGroup of leftLookup) {
            const rightGroup = rightLookup.getOrDefault(leftGroup.key);

            for (const left of leftGroup) {
                if (rightGroup != null) {
                    for (const right of rightGroup) {
                        yield selector(left, right);
                    }
                } else {
                    yield selector(left, undefined);
                }
            }
        }

        for (const rightGroup of rightLookup) {
            if (!leftLookup.containsKey(rightGroup.key)) {
                for (const right of rightGroup) {
                    yield selector(undefined, right);
                }
            }
        }
    }
}
