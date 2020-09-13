import { ReadOnlyList } from '../ReadOnlyList';

export class GroupJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly rightList: ReadOnlyList<TRight>
    ) {
    }
}
