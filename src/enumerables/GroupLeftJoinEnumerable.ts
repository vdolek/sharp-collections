import { Enumerable, GroupLeftJoinElement, ReadOnlyList } from '@sharp-collections';

export class GroupLeftJoinEnumerable<TLeft, TRight, TKey, TResult = GroupLeftJoinElement<TLeft, TRight>> extends Enumerable<TResult> {
    public constructor(
        private readonly leftSource: Iterable<TLeft>,
        private readonly rightSource: Iterable<TRight>,
        private readonly leftKeySelector: (value: TLeft, index: number) => TKey,
        private readonly rightKeySelector: (value: TRight, index: number) => TKey,
        private readonly resultSelector?: (left: TLeft, rightList: ReadOnlyList<TRight> | null) => TResult
    ) {
        super();
    }

    public *[Symbol.iterator](): Iterator<TResult> {
        const rightEnumerable = Enumerable.from(this.rightSource);
        const rightLookup = rightEnumerable.toLookup(this.rightKeySelector);

        const selector = this.resultSelector ?? ((left, rightsList) => new GroupLeftJoinElement(left, rightsList) as unknown as TResult);

        let index = 0;
        for (const left of this.leftSource) {
            const key = this.leftKeySelector(left, index++);
            const rightGroup = rightLookup.getOrNull(key);
            if (rightGroup != null) {
                yield selector(left, rightGroup);
            } else {
                yield selector(left, null);
            }
        }
    }
}