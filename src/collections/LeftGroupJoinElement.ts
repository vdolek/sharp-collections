import { ReadOnlyList } from '../internal';

export class LeftGroupJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly rightList: ReadOnlyList<TRight> | undefined
    ) {
    }
}
