import { ReadOnlyList } from '@src/collections/ReadOnlyList';

export class GroupLeftJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly rightList: ReadOnlyList<TRight> | null
    ) {
    }
}
