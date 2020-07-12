import { ReadOnlyList } from '@src/Internal';

export class GroupJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly right: ReadOnlyList<TRight>
    ) {
    }
}
