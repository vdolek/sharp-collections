import { ReadOnlyList } from '@sharp-collections';

export class GroupJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly right: ReadOnlyList<TRight>
    ) {
    }
}
