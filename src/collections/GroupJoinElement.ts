import { ReadOnlyList } from '../internal';

export class GroupJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly rightList: ReadOnlyList<TRight>
    ) {
    }
}
