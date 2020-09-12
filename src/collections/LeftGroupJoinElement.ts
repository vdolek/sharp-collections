import { ReadOnlyList } from './ReadOnlyList';

export class LeftGroupJoinElement<TLeft, TRight> {
    public constructor(
        public readonly left: TLeft,
        public readonly rightList: ReadOnlyList<TRight> | undefined
    ) {
    }
}
